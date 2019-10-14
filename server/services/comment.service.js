import Comment from '../models/comment.model';

import mongoConnection from '../util/mongo';
mongoConnection();

export const create = async commentParam => {
  let error = {};
  if (commentParam.body.body.trim() === '') {
    error.body = 'Must not be empty';
    return error;
  }
  commentParam.userHandle = commentParam.user.handle;
  commentParam.postId = commentParam.params.postId;
  const newComment = new Comment(commentParam);
  newComment.createdAt = new Date().toISOString();

  // await newComment.save();
  return newComment;
};
