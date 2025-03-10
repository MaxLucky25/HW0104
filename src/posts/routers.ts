import { Router } from 'express';
import { postValidators } from './validators';
import { authMiddleware } from '../common/authMiddleware';
import { inputCheckErrorsMiddleware } from '../common/validationMiddleware';
import { postRepository } from './postRepository';
import { postQueryRepository } from './postQueryRepository';

export const postsRouter = Router();

postsRouter.get('/', async (req, res) => {
    const result = await postQueryRepository.getPosts(req.query);
    res.status(200).json(result);
});

postsRouter.get('/:id', async (req, res) => {
    const post = await postRepository.getById(req.params.id);
    post ? res.json(post) : res.sendStatus(404);
});

postsRouter.post('/',
    authMiddleware,
    ...postValidators,
    inputCheckErrorsMiddleware,
    async (req, res) => {
        const newPost = await postRepository.create(req.body);
        newPost ? res.status(201).json(newPost) : res.sendStatus(400);
    }
);

postsRouter.put('/:id',
    authMiddleware,
    ...postValidators,
    inputCheckErrorsMiddleware,
    async (req, res) => {
        const updated = await postRepository.update(req.params.id, req.body);
        updated ? res.sendStatus(204) : res.sendStatus(404);
    }
);

postsRouter.delete('/:id',
    authMiddleware,
    async (req, res) => {
        const deleted = await postRepository.delete(req.params.id);
        deleted ? res.sendStatus(204) : res.sendStatus(404);
    }
);