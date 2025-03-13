import dotenv from "dotenv";
import {Collection, Db, MongoClient } from "mongodb";
import {BlogDBType} from "../models/blogModels";
import {PostDBType} from "../models/postModels";


dotenv.config()

export let db: Db;
export let blogCollection: Collection<BlogDBType>;
export let postCollection: Collection<PostDBType>;

const mongoURI = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
const dbName = 'Cluster0103';

const client = new MongoClient(mongoURI, {
    serverSelectionTimeoutMS: 15000,
    tls: true,
    tlsAllowInvalidCertificates: true,
});

export const connectToDB = async () => {
    try{
        await client.connect();
        db = client.db(dbName);

        blogCollection= db.collection<BlogDBType>("blogs");
        await blogCollection.createIndex({id:1}, {unique:true});
        postCollection= db.collection<PostDBType>("posts");
        await postCollection.createIndex({id:1}, {unique:true});

        console.log("Successfully connected to MongoDB");
        return true;
    }catch(e){
        console.error('Connection to MongoDb failed', e);
        await client.close();
        return false;
    }
};