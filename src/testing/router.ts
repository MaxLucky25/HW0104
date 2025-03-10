import { Router } from 'express';
import {blogCollection, postCollection} from "../db/mongo-db";


export const testingRouter = Router();

testingRouter.delete('/all-data', async (req, res) => {
    await blogCollection.deleteMany({});
    await postCollection.deleteMany({});
    res.sendStatus(204);
});