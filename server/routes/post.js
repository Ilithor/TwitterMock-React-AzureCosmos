import express from 'express';
const router = express.Router();
import { getPostList, createPost } from '../handlers/post';
import { authUser } from '../util/auth';

router.get('/', getPostList);
router.post('/', authUser, createPost);

export default router;
