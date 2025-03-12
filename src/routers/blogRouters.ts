
import { Router } from 'express';
import {blogValidators, postForSpecificBlogValidators} from '../validators/BlogValidators';
import { authMiddleware } from '../middlewaries/authMiddleware';
import { inputCheckErrorsMiddleware } from '../middlewaries/validationMiddleware';
import { blogRepository } from '../repositories/blogRepository';
import { blogQueryRepository } from '../repositories/blogQueryRepository';
import {postQueryRepository} from "../repositories/postQueryRepository";
import {postRepository} from "../repositories/postRepository";

export const blogsRouter = Router();

blogsRouter.get('/', async (req, res) => {
    const result = await blogQueryRepository.getBlogs(req.query);
    res.status(200).json(result);
});

blogsRouter.get('/:id', async (req, res) => {
    const blog = await blogRepository.getById(req.params.id);
    blog ? res.json(blog) : res.sendStatus(404);
});

blogsRouter.post('/',
    authMiddleware,
    ...blogValidators,
    inputCheckErrorsMiddleware,
    async (req, res) => {
        const newBlog = await blogRepository.create(req.body);
        res.status(201).json(newBlog);
    }
);

blogsRouter.put('/:id',
    authMiddleware,
    ...blogValidators,
    inputCheckErrorsMiddleware,
    async (req, res) => {
        const updated = await blogRepository.update(req.params.id, req.body);
        updated ? res.sendStatus(204) : res.sendStatus(404);
    }
);

blogsRouter.delete('/:id',
    authMiddleware,
    async (req, res) => {
        const deleted = await blogRepository.delete(req.params.id);
        deleted ? res.sendStatus(204) : res.sendStatus(404);
    }
);

blogsRouter.get('/:id/posts', async (req, res) => {
    const blog = await blogRepository.getById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const result = await postQueryRepository.getPostsByBlogId(req.params.id, req.query);
    res.status(200).json(result);
});


blogsRouter.post('/:id/posts',
    authMiddleware,
    ...postForSpecificBlogValidators,
    inputCheckErrorsMiddleware,
    async (req, res) => {
        const blog = await blogRepository.getById(req.params.id);
        if (!blog) {
            res.sendStatus(404);
            return;
        }
        const postInput = { ...req.body, blogId: req.params.id };
        const newPost = await postRepository.create(postInput);
        newPost ? res.status(201).json(newPost) : res.sendStatus(400);
    }
);