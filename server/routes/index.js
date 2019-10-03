const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const postService = require('../services/post.service');

// Routes
router.get('/posts', getPostList);
router.get('/users', getUserList);
router.post('/createPost', Authorization, createPost);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

function getPostList(req, res, next) {
  postService
    .getList()
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
      // Returns list of posts in array
      return res.json(posts);
    })
    .catch(err => console.error(err));
}

function Authorization(req, res, next) {
  userService
    .authUser(req)
    .then(data => {
      if (typeof data !== 'string') {
          return res.status(401).json({ error: data });
      } else {
        return userService.findUser(data);
      }
    })
    .then(doc => {
      if (typeof doc.user === 'string') {
        return res.status(401).json({ error: doc });
      } else if (typeof doc.handle === 'string') {
        req.body.userHandle = doc.handle;
        return next();
      }
    })
    .catch(err => {
      console.error('Error while verifying token', err);
      return res.status(403).json(err);
    });
}

// Makes one post
function createPost(req, res, next) {
  let id;
  postService
    .create(req.body)
    .then(data => {
      // If no id, function returned with
      // validation errors
      if (data.id === undefined) {
        return res.status(400).json({ error: data });
      } else {
        id = data.id;
      }
    })
    .then(() => {
      return res
        .status(201)
        .json({ message: `document ${id} created successfully` });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
}

function getUserList(req, res, next) {
  userService
    .getList()
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
      // Returns list of users in array
      return res.json(users);
    })
    .catch(err => {
      console.error(err);
    });
}

async function registerUser(req, res, next) {
  let token;
  userService
    .register(req.body)
    .then(data => {
      // If function returns object, user
      // failed validation checks
      if (typeof data === 'object') {
        return res.status(400).json({ error: data });
      } else {
        // If pass validation, generate user token
        token = userService.generateUserToken(data);
      }
    })
    .then(() => {
      // Returns user token
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}

async function loginUser(req, res, next) {
  let token;
  userService
    .login(req.body)
    .then(data => {
      // If function returns object, user
      // failed validation checks
      if (typeof data === 'object') {
        if (data.password) {
          return res
            .status(403)
            .json({ error: 'Wrong credentials, please try again' });
        } else {
          return res.status(400).json({ error: data });
        }
      } else {
        token = data;
      }
    })
    .then(() => {
      // Returns user token
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}
