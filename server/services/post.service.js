import Post from '../models/post.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Retrieves all posts in desc order
 * @return {Promise<post[Post]> | PostNotFound}
 */
export const getList = async () => {
  let post = [];
  let error = {};
  post = await Post.find({})
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
 * @param {Object} postParam
 * @param {User} user
 * @return {Post | PostError}
 */
export const create = async (postParam, user) => {
  // Validation
  let error = {};
  if (postParam.body.trim() === '') {
    error.body = 'Body must not be empty';
    return error;
  }
  // Create new post
  postParam.userHandle = user.handle;
  postParam.userImage = user.bio.image;
  const newPost = new Post(postParam);
  newPost.createdAt = new Date().toISOString();
  newPost.likeCount = 0;
  newPost.commentCount = 0;

  // Save post
  await newPost.save();
  return newPost;
};

/** Deletes post
 * @param {Request} postParam
 * @return {Promise<Post>}
 */
export const findAndDeletePost = async postParam => {
  let post = {};
  post = await Post.findOneAndDelete({
    _id: postParam.params.postId,
  });
  return post;
};
