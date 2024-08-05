import express from 'express';
import { promises as fs } from 'fs';
import { IMessage } from '../types';

const messagesRouter = express.Router();

const messagesDir = './messages';

const fileName = () => {
    const datetime = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
    return `${messagesDir}/${datetime}.txt`;
};

messagesRouter.post('/', async (req, res) => {
    const datetime = new Date().toISOString();
    const message: IMessage = {
        message: req.body.message,
        datetime:datetime,
    };

    await fs.writeFile(fileName(), JSON.stringify(message));
    res.send(message);
});

export default messagesRouter;
