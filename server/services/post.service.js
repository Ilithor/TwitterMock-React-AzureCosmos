import { Post } from '../models/post.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Retrieves all posts in desc order
 * @returns {Promise<post[Post[]]>}
 */
export const getList = () =>
  new Promise(resolve => {
    const postList = Post.find({})
      .sort({ createdAt: -1 })
      .read(mongo.ReadPreference.NEAREST)
      .limit(100);
    resolve(postList);
  });

/** Creates and saves new post
 * @param {Object} postParam
 * @param {User} user
 * @returns {Promise<Post>}
 */
export const create = (postParam, user) =>
  new Promise((resolve, reject) => {
    // Validation
    if (postParam.body.trim() === '') {
      reject({ body: 'Body must not be empty' });
    }
    // Create new post
    postParam.userHandle = user.userHandle;
    const newPost = new Post(postParam);
    newPost.likeCount = 0;
    newPost.commentCount = 0;

    // Save post
    newPost.save();
    resolve(newPost);
  });

/** Deletes post
 * @param {String} _id
 */
export const findAndDeletePost = _id =>
  new Promise((resolve, reject) => {
    try {
      const post = Post.deleteOne({
        _id,
      });
      resolve(post);
    } catch (err) {
      reject(err);
    }
  });
