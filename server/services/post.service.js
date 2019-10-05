const Post = require('../models/post.model');
const ReadPreference = require('mongodb').ReadPreference;
const ObjectID = require('mongodb').ObjectID;

require('../util/mongo').connect();

// Retrieves all posts in desc order
exports.getList = async () => {
  return await Post.find({})
    .sort({ createdAt: -1 })
    .read(ReadPreference.NEAREST);
};

// Creates and saves new post
exports.create = async postParam => {
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
};
