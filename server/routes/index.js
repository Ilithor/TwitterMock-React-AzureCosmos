var express = require('express');
var router = express.Router();

var userService = require('../services/user-service');
var postService = require('../services/post-service');

router.get('/posts', function(req, res, next) {
  postService.getPosts(req, res);
});

router.post('/createPost', function(req, res, next) {
  postService.createPost(req, res);
});

module.exports = router;
