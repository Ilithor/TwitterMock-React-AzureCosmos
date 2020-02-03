import _ from 'lodash';
import { getList, create, remove } from '../services/comment.service';
import { createNotification } from './notification';
import {
  findPostById,
  findPostAndUpdateCount,
  findCommentByHandleAndPostId,
} from './find';
import { deleteNotification } from './notification';

/**
 * Attempts to retrieve a full comment list
 * @param {RouteHandler}
 */
export const getCommentList = async (req, res) => {
  const data = await getList().catch(err => {
    console.error(err);
    res.status(500);
  });
  if (!data) {
    return res.status(404);
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
};

/** Create a comment on a post
 * @type {RouteHandler}
 */
export const commentOnPost = async (req, res, next) => {
  const newNotification = {};
  const post = await findPostById(req.params.postId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  const postToUpdate = { ...post };
  newNotification.recipient = postToUpdate.userHandle;
  postToUpdate.commentCount++;
  const comment = await create(req).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
  newNotification.typeId = comment._id;
  await findPostAndUpdateCount(
    req.params.postId,
    postToUpdate.likeCount,
    postToUpdate.commentCount
  );
  const recipient = newNotification.recipient;
  const postId = req.params.postId;
  const sender = req.user.userHandle;
  const type = 'comment';
  const typeId = comment._id;
  await createNotification(recipient, postId, sender, type, typeId);
  return res.status(200);
};

/** Deletes a comment on a post
 * @type {RouteHandler}
 */
export const deleteComment = async (req, res, next) => {
  const post = await findPostById(req.params.postId).catch(err => {
    console.error(err);
    res.send(err);
  });
  const postToUpdate = { ...post };
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
            return res.status(500).send({ message: 'Something went wrong' });
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
};
