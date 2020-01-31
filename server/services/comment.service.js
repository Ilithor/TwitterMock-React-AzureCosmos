import Comment from '../models/comment.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Retrieves entire list of comments
 * @returns {Promise<UserComment[]> | UserCommentError}
 */
export const getList = async () => {
  const error = {};
  const commentList = await Comment.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST)
    .limit(100);
  if (commentList.length === 0) {
    error.comment = 'No comments found';
    return error;
  }
  return commentList;
};

/** Creates a new comment
 * @param {Request} commentParam
 * @returns {Promise<NewUserComment> | UserCommentError}
 */
export const create = async commentParam => {
  const dataForComment = {};
  const error = {};

  // Validation
  if (commentParam.body.body.trim() === '') {
    error.comment = 'Must not be empty';
    return error;
  }

  // Construct needed properties for the comment
  dataForComment.userHandle = commentParam.user.handle;
  dataForComment.postId = commentParam.params.postId;
  dataForComment.userImage = commentParam.user.bio.image;
  dataForComment.body = commentParam.body.body;
  let newComment = new Comment(dataForComment);
  newComment.createdAt = new Date().toISOString();

  // Save the comment
  await newComment.save();
  return newComment;
};

/** Deletes Comment document
 * @param {Request} commentParam
 * @return {Promise<UserComment>}
 */
export const remove = async commentParam => {
  const comment = await Comment.findOneAndDelete({
    postId: commentParam.params.postId,
    userHandle: commentParam.user.handle,
  });
  return comment;
};
