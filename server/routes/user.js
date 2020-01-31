import express from 'express';
import {
  getUserList,
  registerUser,
  loginUser,
  imageUpload,
  addUserDetail,
  getAuthenticatedUser,
  getUserDetail,
  fetchLikeList,
} from '../handlers/user';
import { authUser } from '../util/auth';
import {
  getNotification,
  markNotificationRead,
} from '../handlers/notification';
import { multerUploads } from '../util/multer';

const router = express.Router();

router.get('/', authUser, getAuthenticatedUser);
router.post('/', authUser, addUserDetail);
router.get('/list', getUserList);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/image', authUser, multerUploads, imageUpload);
router.get('/notification', authUser, getNotification);
router.post('/notification', authUser, markNotificationRead);
router.get('/like', fetchLikeList);
router.get('/:handle', getUserDetail);

export default router;
