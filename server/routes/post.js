import express from 'express';
import { getPostList, createPost, getPost, deletePost } from '../handlers/post';
import { commentOnPost, deleteComment } from '../handlers/comment';
import { likePost, unlikePost } from '../handlers/like';
import { authUser } from '../util/auth';
import {
  createNotification,
  deleteNotification,
  deleteAllNotification,
} from '../handlers/notification';

const router = express.Router();

router.get('/', getPostList);
router.post('/', authUser, createPost);
router.get('/:postId', getPost);
router.delete('/:postId', authUser, deletePost, deleteAllNotification);
router.get('/:postId/like', authUser, likePost, createNotification);
router.get('/:postId/unlike', authUser, unlikePost, deleteNotification);
router.post('/:postId/comment', authUser, commentOnPost, createNotification);
router.delete(
  '/:postId/uncomment',
  authUser,
  deleteComment,
  deleteNotification
);

export default router;
