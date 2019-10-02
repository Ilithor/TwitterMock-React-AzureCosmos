const Post = require('../models/post.model');
const ReadPreference = require('mongodb').ReadPreference;
const ObjectID = require('mongodb').ObjectID;

require('../mongo').connect();

module.exports = {
  getPosts,
  createPost
};

async function getPosts() {
  // Retrieves all posts in desc order
  return await Post.find({})
    .sort({ createdAt: -1 })
    .read(ReadPreference.NEAREST);
}

async function createPost(postParam) {
  // Create new post
  const newPost = new Post(postParam);
  newPost.createdAt = new Date().toISOString();

  // Save post
  await newPost.save();
  return newPost;
}
