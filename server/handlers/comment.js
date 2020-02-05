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
 * @type {RouteHandler}
 */
export const getCommentList = async (req, res) => {
  const data = await getList().catch(err => {
    console.error(err);
    return res.send(err);
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
  const post = await findPostById(req.params.postId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  const postToUpdate = post;
  postToUpdate.commentCount++;
  const comment = await create(req).catch(err => {
    console.error(err);
    return res.send(err);
  });
  if (comment._id) {
    await findPostAndUpdateCount(
      req.params.postId,
      postToUpdate.likeCount,
      postToUpdate.commentCount
    );
    const recipient = postToUpdate.userHandle;
    const postId = req.params.postId;
    const sender = req.user.userHandle;
    const type = 'comment';
    const typeId = comment._id;
    await createNotification(recipient, postId, sender, type, typeId);
    return res.status(200).send(true);
  }
};

/** Deletes a comment on a post
 * @type {RouteHandler}
 */
export const deleteComment = async (req, res, next) => {
  const post = await findPostById(req.params.postId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  const postToUpdate = post;
  const comment = await findCommentByHandleAndPostId(
    req.user.userHandle,
    req.params.postId
  ).catch(err => {
    console.error(err);
    return res.status(404);
  });
  await remove(req).catch(err => {
    console.error(err);
    return res.status(404);
  });
  postToUpdate.commentCount--;
  await findPostAndUpdateCount(
    req.params.postId,
    postToUpdate.likeCount,
    postToUpdate.commentCount
  );
  const userHandle = req.user.userHandle;
  const type = 'comment';
  const typeId = comment._id;
  await deleteNotification(userHandle, type, typeId);
  return res.status(200).send(true);
};
