import express from 'express';
import { getPostList, createPost, getPost, deletePost } from '../handlers/post';
import {
  getCommentList,
  commentOnPost,
  deleteComment,
} from '../handlers/comment';
import { likePost, unlikePost } from '../handlers/like';
import { authUser } from '../util/auth';

const router = express.Router();

router.get('/', getPostList);
router.post('/', authUser, createPost);
router.get('/comment', getCommentList);
router.get('/:postId', getPost);
router.delete('/:postId', authUser, deletePost);
router.get('/:postId/like/:likeId', authUser, likePost);
router.get('/:postId/unlike', authUser, unlikePost);
router.post('/:postId/comment', authUser, commentOnPost);
router.delete(
  '/:postId/uncomment',
  authUser,
  deleteComment
);

export default router;
