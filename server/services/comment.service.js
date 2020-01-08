import Comment from '../models/comment.model';

import mongoConnection from '../util/mongo';
mongoConnection();

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
