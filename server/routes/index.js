const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const postService = require('../services/post.service');
const { authUser } = require('../util/auth');
const { getPostList, createPost } = require('../handlers/posts');
const { getUserList, registerUser, loginUser } = require('../handlers/users');

// Routes
router.get('/posts', getPostList);
router.get('/users', getUserList);
router.post('/createPost', authUser, createPost);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
