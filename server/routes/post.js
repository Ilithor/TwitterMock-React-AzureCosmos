import express from 'express';
const router = express.Router();
import { getPostList, createPost, getPost, deletePost } from '../handlers/post';
import { commentOnPost } from '../handlers/comment';
import { likePost, unlikePost } from '../handlers/like';
import { authUser } from '../util/auth';

router.get('/', getPostList);
router.post('/', authUser, createPost);
router.get('/:postId', getPost);
router.delete('/:postId', authUser, deletePost);
router.get('/:postId/like', authUser, likePost);
router.get('/:postId/unlike', authUser, unlikePost);
router.post('/:postId/comment', authUser, commentOnPost);

export default router;
