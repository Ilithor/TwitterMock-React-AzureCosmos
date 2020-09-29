import { Post } from '../models/post.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Retrieves all posts in desc order
 *
 * @returns {Promise<PostData[]>}
 */
export const getList = async () => {
  return await Post.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST)
    .limit(100)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Creates and saves new post
 *
 * @param {object} postParam
 * @param {UserData} user
 * @returns {Promise<PostData>}
 */
export const create = async (postParam, user) => {
  // Validation
  if (postParam.body.trim() === '') {
    return Promise.reject({ body: 'Body must not be empty' });
  }
  // Create new post
  postParam.userHandle = user.userHandle;
  const newPost = new Post(postParam);
  newPost.likeCount = 0;
  newPost.commentCount = 0;

  // Save post
  await newPost.save();
  return newPost;
};

/** Deletes post
 *
 * @param {string} _id
 * @returns {Promise<PostData>}
 */
export const findAndDeletePost = async _id => {
  return await Post.deleteOne({
    _id,
  }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};
