import { PostDBType, PostInputModel, PostViewModel } from './models';
import { blogRepository } from '../blogs/blogRepository';
import {postCollection} from "../db/mongo-db";

export const postRepository = {

    async getAll(): Promise<PostViewModel[]> {
        const posts = await postCollection.find().toArray();
        return posts.map(this.mapToOutput);
    },

    async create(input: PostInputModel): Promise<PostViewModel | null> {
        const blog = await blogRepository.getById(input.blogId);
        if (!blog) return null;

        const newPost: PostDBType = {
            id: Date.now().toString(),
            title: input.title,
            shortDescription: input.shortDescription,
            content: input.content,
            blogId: input.blogId,
            blogName: blog.name,
            createdAt: new Date()
        };

        const result = await postCollection.insertOne(newPost);
        const created = await postCollection.findOne({ _id: result.insertedId });
        return this.mapToOutput(created!);
    },

    async getById(id: string): Promise<PostViewModel | null> {
        const post = await postCollection.findOne(
            {id:id},
            {projection: {_id: 0} }
        );
        return post as PostViewModel | null;
    },

    async update(id: string, input: PostInputModel): Promise<boolean> {
        const blog = await blogRepository.getById(input.blogId);
        if (!blog) return false;

        const result = await postCollection.updateOne(
            {id: id},
            {
                $set: {
                    title: input.title,
                    shortDescription: input.shortDescription,
                    content: input.content,
                    blogId: input.blogId,
                    blogName: blog.name,
                }
            }
        );
        return result.matchedCount === 1;
    },

    async delete(id: string): Promise<boolean> {
        const result = await postCollection.deleteOne({ id: id });
        return result.deletedCount === 1;
    },
    mapToOutput(post: PostDBType): PostViewModel {
        const { _id, ...rest } = post;
        return rest;
    }

};