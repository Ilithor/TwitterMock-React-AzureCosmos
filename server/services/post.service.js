import Post from '../models/post.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Retrieves all posts in desc order
 * 
 */
export const getList = async () => {
  return await Post.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST);
};

/** Creates and saves new post
 * @param {string} postParam 
 * @param {string} handle 
 */
export const create = async (postParam, handle) => {
  // Validation
  let error = {};
  postParam.userHandle = handle;
  if (postParam.body.trim() === '') {
    error.body = 'Body must not be empty';
    return error;
  }
  // Create new post
  const newPost = new Post(postParam);
  newPost.createdAt = new Date().toISOString();

  // Save post
  await newPost.save();
  console.log(newPost);
  return newPost;
};
