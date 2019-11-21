import express from 'express';
import {
  registerUser,
  loginUser,
  imageUpload,
  addUserDetail,
  getAuthenticatedUser,
  getUserDetail,
} from '../handlers/user';
import { authUser } from '../util/auth';
import {
  getNotification,
  markNotificationRead,
} from '../handlers/notification';
import { multerUploads } from '../util/multer';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/image', authUser, multerUploads, imageUpload);
router.post('/', authUser, addUserDetail);
router.get('/', authUser, getAuthenticatedUser);
router.get('/:handle', authUser, getUserDetail);
router.post('/notification', authUser, markNotificationRead);
router.get('/:handle/notification', authUser, getNotification);

export default router;
