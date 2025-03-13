import {ObjectId} from "mongodb";

export type BlogDBType = {
    _id?: ObjectId;
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: Date;
    isMembership: boolean;
};

export type BlogViewModel = Omit<BlogDBType, '_id'>;

export type CreateBlogDto = Pick<BlogDBType, 'name' | 'description' | 'websiteUrl'>;
export type UpdateBlogDto = Pick<BlogDBType, 'name' | 'description' | 'websiteUrl'>;