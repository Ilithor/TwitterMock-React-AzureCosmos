import Comment from '../models/comment.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

export const getList = async () => {
  let commentList = [];
  let error = {};
  commentList = await Comment.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST);
  if (commentList.length === 0) {
    error.comment = 'No comments found';
    return error;
  }
  return commentList;
};

/** Creates a new comment
 * @param {Request} commentParam
 * @return {Promise<NewUserComment> | UserCommentError}
 */
export const create = async commentParam => {
  let dataForComment = {};
  let error = {};

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
  let comment = {};
  comment = await Comment.findOneAndDelete({
    postId: commentParam.params.postId,
    userHandle: commentParam.user.handle,
  });
  return comment;
};
