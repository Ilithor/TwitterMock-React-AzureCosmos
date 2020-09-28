import express from 'express';
import userController from './user';
import postController from './post';
const router = express.Router();

router.all('/alive', (req, res) => {
  res.status(200).send('<h1>Hi 🙋‍♂️</h1>');
});

// Post routes
router.use('/post', postController);

// User routes
router.use('/user', userController);

export default router;
