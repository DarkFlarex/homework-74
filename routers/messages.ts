import express from 'express';
import { promises as fs } from 'fs';
import { IMessage } from '../types';

const messagesRouter = express.Router();

const data: IMessage[] = [];
const messagesDir = './messages';

messagesRouter.get('/', async (req, res) => {
    const files = await fs.readdir(messagesDir);
    files.reverse();
    const latestFiles = files.slice(0, 5);
    for (const file of latestFiles) {
        const path = `${messagesDir}/${file}`;
        const fileContents = await fs.readFile(path);
        const message: IMessage = JSON.parse(fileContents.toString());
        data.push(message);
    }
    res.send(data);
});

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
