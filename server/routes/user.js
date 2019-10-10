import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  imageUpload,
  addUserDetail,
  // getAuthenticatedUser
} from '../handlers/user';
import { authUser } from '../util/auth';
import { multerUploads } from '../util/multer';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/image', authUser, multerUploads, imageUpload);
router.post('/', authUser, addUserDetail);
// router.get('/', authUser, getAuthenticatedUser);

export default router;
