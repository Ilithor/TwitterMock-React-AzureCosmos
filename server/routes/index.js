import express from 'express';
import userController from './user';
import postController from './post';
const router = express.Router();

router.all('/alive', (req, res) => {
  res.status(200).send('Hi');
});

// Post routes
router.use('/post', postController);

// User routes
router.use('/user', userController);

export default router;
