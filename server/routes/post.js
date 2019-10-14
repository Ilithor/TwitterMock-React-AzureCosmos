import express from 'express';
const router = express.Router();
import { getPostList, createPost, getPost } from '../handlers/post';
import { commentOnPost } from '../handlers/comment';
import { authUser } from '../util/auth';

router.get('/', getPostList);
router.post('/', authUser, createPost);
router.get('/:postId', getPost);
// TODO: delete post
// TODO: like post
// TODO: unlike post
router.post('/:postId/comment', authUser, commentOnPost);

export default router;
