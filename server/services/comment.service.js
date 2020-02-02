import Comment from '../models/comment.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Retrieves entire list of comments
 * @returns {Promise<UserComment[]> | UserCommentError}
 */
export const getList = () =>
  new Promise(resolve => {
    const commentList = Comment.find({})
      .sort({ createdAt: -1 })
      .read(mongo.ReadPreference.NEAREST)
      .limit(100);
    resolve(commentList);
  });

/** Creates a new comment
 * @param {Request} commentParam
 * @returns {Promise<NewUserComment> | UserCommentError}
 */
export const create = commentParam =>
  new Promise((resolve, reject) => {
    // Validation
    if (commentParam.body.body.trim() === '') {
      reject({ comment: 'Must not be empty' });
    }

    // Construct needed properties for the comment
    const dataForComment = {};
    dataForComment.userHandle = commentParam.user.userHandle;
    dataForComment.postId = commentParam.params.postId;
    dataForComment.userImage = commentParam.user.bio.userImage;
    dataForComment.body = commentParam.body.body;
    const newComment = new Comment(dataForComment);

    // Save the comment
    newComment.save();
    resolve(newComment);
  });

/** Deletes Comment document
 * @param {Request} commentParam
 * @returns {Promise<UserComment>}
 */
export const remove = commentParam =>
  new Promise((resolve, reject) => {
    const comment = Comment.findOneAndDelete({
      postId: commentParam.params.postId,
      userHandle: commentParam.user.userHandle,
    });
    if (!comment) {
      reject({ comment: 'Comment not found' });
    }
    resolve(comment);
  });
