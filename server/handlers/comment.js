import _ from 'lodash';
import { getList, create, remove } from '../services/comment.service';
import { createNotification } from './notification';
import {
  findPostById,
  findPostAndUpdateCount,
  findCommentByHandleAndPostId,
} from './find';

export const getCommentList = (req, res) => {
  getList()
    .then(data => {
      if (!data) {
        return res.status(404).json(data);
      }
      const commentList = _.map(data, doc => ({
        _id: doc.id,
        userHandle: doc.userHandle,
        postId: doc.postId,
        body: doc.body,
        createdAt: doc.createdAt,
      }));
      if (commentList.length <= 0) {
        return res.json({ message: 'No comments found' });
      } else {
        return res.json(commentList);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

/** Create a comment on a post
 * @type {RouteHandler}
 */
export const commentOnPost = async (req, res, next) => {
  let postToUpdate = {};
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
          if (comment.comment) {
            return res.status(400).json({ error: comment });
          } else {
            req.notification.typeId = comment._id;
            await findPostAndUpdateCount(
              req.params.postId,
              postToUpdate.likeCount,
              postToUpdate.commentCount
            );
            const recipient = req.notification.recipient;
            const postId = req.params.postId;
            const sender = req.user.handle;
            const type = 'comment';
            const typeId = comment._id;
            await createNotification(recipient, postId, sender, type, typeId);
            return res.ok;
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
