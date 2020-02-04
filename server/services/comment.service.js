import { Comment } from '../models/comment.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Retrieves entire list of comments
 * @returns {Promise<UserComment[]>}
 */
export const getList = async () => {
  return await Comment.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST)
    .limit(100)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Creates a new comment
 * @param {Request} commentParam
 * @returns {Promise<NewUserComment> | UserCommentError}
 */
export const create = async commentParam => {
  // Validation
  if (commentParam.body.body.trim() === '') {
    return Promise.reject({ comment: 'Must not be empty' });
  }

  // Construct needed properties for the comment
  const dataForComment = {};
  dataForComment.userHandle = commentParam.user.userHandle;
  dataForComment.postId = commentParam.params.postId;
  dataForComment.userImage = commentParam.user.bio.userImage;
  dataForComment.body = commentParam.body.body;
  const newComment = new Comment(dataForComment);

  // Save the comment
  await newComment.save();
  return Promise.resolve(newComment);
};

/** Deletes Comment document
 * @param {Request} commentParam
 * @returns {Promise<UserComment>}
 */
export const remove = async commentParam => {
  return await Comment.findOneAndDelete({
    postId: commentParam.params.postId,
    userHandle: commentParam.user.userHandle,
  }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};
