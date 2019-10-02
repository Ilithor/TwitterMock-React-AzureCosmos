const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const postService = require('../services/post.service');

// Routes
router.get('/posts', getPosts);
router.get('/users', getUsers);
router.post('/createPost', createPost);
router.post('/register', register);

module.exports = router;

function getPosts(req, res, next) {
  postService
    .getPosts()
    .then(data => {
      let posts = [];
      data.forEach(doc => {
        posts.push({
          postId: doc.id,
          body: doc.body,
          userHandle: doc.userHandle,
          createdAt: doc.createdAt,
          commentCount: doc.commentCount,
          likeCount: doc.likeCount
        });
      });
      return res.json(posts);
    })
    .catch(err => console.error(err));
}

function createPost(req, res, next) {
  postService
    .createPost(req.body)
    .then(doc => {
      res
        .status(201)
        .json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error(err);
    });
}

function getUsers(req, res, next) {
  userService
    .getUsers()
    .then(data => {
      let users = [];
      data.forEach(user => {
        users.push({
          userId: user.id,
          email: user.email,
          password: user.password,
          handle: user.handle
        });
      });
      return res.json(users);
    })
    .catch(err => {
      console.error(err);
    });
}

async function register(req, res, next) {
  let token;
  userService
    .registerUser(req.body)
    .then(data => {
      if (typeof data === 'string') {
        return res.status(400).json({ error: data });
      } else {
        token = userService.generateUserToken(data);
      }
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}
