import Post from '../models/post.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Retrieves all posts in desc order
 * @returns {Promise<post[Post], error>}
 */
export const getList = async () => {
  let post = [];
  let error = {};
  post = return await Post.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST);

    if (post.length === 0) {
      error.post = 'No posts found';
      return error;
    } else {
      return post;
    }
};

/** Creates and saves new post
 * @param {string} postParam
 * @param {string} handle
 */
export const create = async (postParam, handle) => {
  // Validation
  let error = {};
  if (postParam.body.trim() === '') {
    error.body = 'Body must not be empty';
    return error;
  }
  // Create new post
  postParam.userHandle = handle;
  const newPost = new Post(postParam);
  newPost.createdAt = new Date().toISOString();

  // Save post
  await newPost.save();
  return newPost;
};
