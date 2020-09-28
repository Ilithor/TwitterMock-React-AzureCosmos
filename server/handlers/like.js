import { create, remove } from '../services/like.service';
import { createNotification } from './notification';
import {
  findPostById,
  findLikeByHandleAndPostId,
  findPostAndUpdateCount,
  findAndDeleteNotification,
} from './find';

/** Like a post
 *
 * @type {import('express').Handler}
 */
export const likePost = async (req, res, next) => {
  const post = await findPostById(req.params.postId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  const postToUpdate = post;
  const like = await findLikeByHandleAndPostId(
    req.user.userHandle,
    req.params.postId
  ).catch(err => {
    console.error(err);
    return res.status(500);
  });
  if (like) {
    return res.status(409);
  } else {
    const newLike = await create(req).catch(err => {
      console.error(err);
      return res.status(500);
    });
    postToUpdate.likeCount++;
    await findPostAndUpdateCount(
      req.params.postId,
      postToUpdate.likeCount,
      postToUpdate.commentCount
    ).catch(err => {
      console.error(err);
      return res.status(404);
    });
    const recipient = postToUpdate.userHandle;
    const postId = req.params.postId;
    const sender = req.user.userHandle;
    const type = 'like';
    const typeId = newLike._id;
    await createNotification(recipient, postId, sender, type, typeId);
    return res.status(200).send(true);
  }
};

/** Unlike a post
 *
 * @type {import('express').Handler}
 */
export const unlikePost = async (req, res, next) => {
  const post = await findPostById(req.params.postId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  const doc = await remove(req.user.userHandle, req.params.postId).catch(
    err => {
      console.error(err);
      return res.status(404);
    }
  );
  if (doc.postId === req.params.postId) {
    const postToUpdate = post;
    postToUpdate.likeCount--;
    await findPostAndUpdateCount(
      postToUpdate._id,
      postToUpdate.likeCount,
      postToUpdate.commentCount
    );
    const typeId = doc._id;
    await findAndDeleteNotification(typeId);
    return res.status(200).send(true);
  }
};
