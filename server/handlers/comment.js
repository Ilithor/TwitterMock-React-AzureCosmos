import _ from 'lodash';
import { getList, create, remove } from '../services/comment.service';
import { createNotification } from './notification';
import {
  findPostById,
  findPostAndUpdateCount,
  findCommentByHandleAndPostId,
} from './find';
import { deleteNotification } from './notification';

export const getCommentList = (req, res) =>
  new Promise(() => {
    getList()
      .then(data => {
        if (!data) {
          return res.send(data);
        } else {
          const commentList = _.map(data, doc => ({
            commentId: doc.id,
            userHandle: doc.userHandle,
            postId: doc.postId,
            body: doc.body,
            createdAt: doc.createdAt,
          }));
          return res.send(commentList);
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });

/** Create a comment on a post
 * @type {RouteHandler}
 */
export const commentOnPost = (req, res, next) =>
  new Promise(() => {
    req.notification = {};
    findPostById(req.params.postId)
      .then(post => {
        const postToUpdate = post;
        req.notification.recipient = postToUpdate.userHandle;
        postToUpdate.commentCount++;
        create(req)
          .then(comment => {
            req.notification.typeId = comment._id;
            findPostAndUpdateCount(
              req.params.postId,
              postToUpdate.likeCount,
              postToUpdate.commentCount
            );
            const recipient = req.notification.recipient;
            const postId = req.params.postId;
            const sender = req.user.userHandle;
            const type = 'comment';
            const typeId = comment._id;
            createNotification(recipient, postId, sender, type, typeId);
            return res.ok;
          })
          .catch(err => {
            console.error(err);
            res.status(500).send(err);
          });
      })
      .catch(err => {
        console.error(err);
        res.send(err);
      });
  });

/** Deletes a comment on a post
 * @type {RouteHandler}
 */
export const deleteComment = (req, res, next) =>
  new Promise(() => {
    findPostById(req.params.postId)
      .then(post => {
        const postToUpdate = post;
        findCommentByHandleAndPostId(req.user.userHandle, req.params.postId)
          .then(comment => {
            req.notification = {};
            req.notification.typeId = comment._id;
            remove(req)
              .then(doc => {
                if (doc.postId === req.params.postId) {
                  postToUpdate.commentCount--;
                  findPostAndUpdateCount(
                    req.params.postId,
                    postToUpdate.likeCount,
                    postToUpdate.commentCount
                  );
                  req.notification.type = 'comment';
                  deleteNotification(req);
                  return res.status(200);
                } else {
                  return res
                    .status(500)
                    .send({ message: 'Something went wrong' });
                }
              })
              .catch(err => {
                console.error(err);
                res.send(err);
              });
          })
          .catch(err => {
            console.error(err);
            res.send(err);
          });
      })
      .catch(err => {
        console.error(err);
        res.send(err);
      });
  });
