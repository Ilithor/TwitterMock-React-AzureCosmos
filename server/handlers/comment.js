import { create } from '../services/comment.service';
import {
  findPostById,
  findPostAndUpdateCount,
  findCommentByHandleAndPostId,
} from './find';
import { remove } from '../services/comment.service';

/** Create a comment on a post
 * @type {RouteHandler}
 */
export const commentOnPost = async (req, res, next) => {
  let postToUpdate = {};
  let newComment = {};
  req.notification = {};
  await findPostById(req.params.postId)
    .then(async post => {
      if (post.post) {
        return res.status(404).json({ error: post.post });
      } else {
        postToUpdate = post;
        req.notification.recipient = postToUpdate.userHandle;
        postToUpdate.commentCount++;
        await create(req).then(async comment => {
          if (comment.error) {
            return res.status(400).json({ comment: comment.error });
          } else {
            req.notification.typeId = comment._id;
            newComment = comment;
            await findPostAndUpdateCount(
              req.params.postId,
              postToUpdate.likeCount,
              postToUpdate.commentCount
            ).then(() => {
              req.notification.type = 'comment';
              req.notification.typeItem = newComment;
              next();
            });
          }
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

/** Deletes a comment on a post
 * @type {RouteHandler}
 */
export const deleteComment = async (req, res, next) => {
  let postToUpdate = {};
  req.notification = {};
  await findPostById(req.params.postId)
    .then(async post => {
      if (post.post) {
        return res.status(404).json({ error: post.post });
      } else {
        postToUpdate = post;
        await findCommentByHandleAndPostId(
          req.user.handle,
          req.params.postId
        ).then(async comment => {
          if (!comment[0]) {
            return res.status(404).json({ message: "Comment doesn't exist" });
          } else {
            req.notification.typeId = comment[0]._id;
            await remove(req).then(async doc => {
              if (doc.postId === req.params.postId) {
                postToUpdate.commentCount--;
                await findPostAndUpdateCount(
                  req.params.postId,
                  postToUpdate.likeCount,
                  postToUpdate.commentCount
                );
                req.notification.type = 'comment';
                next();
              } else {
                return res
                  .status(500)
                  .json({ message: 'Something went wrong' });
              }
            });
          }
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
