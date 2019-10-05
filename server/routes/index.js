const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const postService = require('../services/post.service');
const { authUser } = require('../util/auth');
const { getPostList, createPost } = require('../handlers/posts');
const {
  getUserList,
  registerUser,
  loginUser,
  imageUpload,
  addUserDetails
} = require('../handlers/users');
const { multerUploads } = require('../util/multer');

// Post routes
router.get('/posts', getPostList);
router.post('/createPost', authUser, createPost);

// User routes
router.get('/users', getUserList);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/user/image', authUser, multerUploads, imageUpload);
router.post('/user', authUser, addUserDetails);

module.exports = router;
