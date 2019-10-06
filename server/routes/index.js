import express from 'express';
import userController from './user';
import postController from './post';
const router = express.Router();

// Post routes
router.use('/post', postController);

// User routes
router.use('/user', userController);

export default router;
