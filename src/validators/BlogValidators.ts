import { body } from 'express-validator';


export const blogValidators = [
    body('name')
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 15 }).withMessage('Max length 15'),

    body('description')
        .isString().withMessage('Description must be a string')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 500 }).withMessage('Max length 500'),

    body('websiteUrl')
        .isString().withMessage('Website URL must be a string')
        .trim()
        .notEmpty().withMessage('Website URL is required')
        .isLength({ max: 100 }).withMessage('Max length 100')
        .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
        .withMessage('Invalid URL format')
];

export const postForSpecificBlogValidators = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 30 }).withMessage('Title length 1-30')
        .notEmpty().withMessage('Title is required'),

    body('shortDescription')
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage('Short description length 1-100')
        .notEmpty().withMessage('Short description is required'),

    body('content')
        .trim()
        .isLength({ min: 1, max: 1000 }).withMessage('Content length 1-1000')
        .notEmpty().withMessage('Content is required'),
];