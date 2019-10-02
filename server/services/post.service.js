const Post = require('../models/post.model');
const ReadPreference = require('mongodb').ReadPreference;
const ObjectID = require('mongodb').ObjectID;

require('../mongo').connect();

module.exports = {
  getList,
  create
};

async function getList() {
  // Retrieves all posts in desc order
  return await Post.find({})
    .sort({ createdAt: -1 })
    .read(ReadPreference.NEAREST);
}

async function create(postParam) {
  // Validation
  let error = {};
  if (postParam.body.trim() === '') {
    error.body = 'Body must not be empty';
    return error;
  }
  // Create new post
  const newPost = new Post(postParam);
  newPost.createdAt = new Date().toISOString();

  // Save post
  await newPost.save();
  return newPost;
}
