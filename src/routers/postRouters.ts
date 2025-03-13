import { Router } from 'express';
import { postValidators } from '../validators/postValidators';
import { authMiddleware } from '../middlewaries/authMiddleware';
import { inputCheckErrorsMiddleware } from '../middlewaries/validationMiddleware';
import { postRepository } from '../repositories/postRepository';
import { postQueryRepository } from '../repositories/postQueryRepository';
import {postService} from "../services/postService";

export const postsRouter = Router();

postsRouter.get('/', async (req, res) => {
    const result = await postService.getAllPosts(req.query);
    res.status(200).json(result);
});

postsRouter.get('/:id', async (req, res) => {
    const post = await postService.getPostById(req.params.id);
    post ? res.json(post) : res.sendStatus(404);
});

postsRouter.post('/',
    authMiddleware,
    ...postValidators,
    inputCheckErrorsMiddleware,
    async (req, res) => {
        const newPost = await postService.createPost(req.body);
        newPost ? res.status(201).json(newPost) : res.sendStatus(400);
    }
);

postsRouter.put('/:id',
    authMiddleware,
    ...postValidators,
    inputCheckErrorsMiddleware,
    async (req, res) => {
        const updated = await postService.updatePost(req.params.id, req.body);
        updated ? res.sendStatus(204) : res.sendStatus(404);
    }
);

postsRouter.delete('/:id',
    authMiddleware,
    async (req, res) => {
        const deleted = await postService.deletePost(req.params.id);
        deleted ? res.sendStatus(204) : res.sendStatus(404);
    }
);