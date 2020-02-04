import { create, remove } from '../services/like.service';
import { createNotification, deleteNotification } from './notification';
import {
  findPostById,
  findLikeByHandleAndPostId,
  findPostAndUpdateCount,
} from './find';

/** Like a post
 * @type {RouteHandler}
 */
export const likePost = async (req, res, next) => {
  const post = await findPostById(req.params.postId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  const postToUpdate = { ...post };
  const newNotification = {};
  newNotification.recipient = postToUpdate.userHandle;
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
    const newLike = create(req).catch(err => {
      console.error(err);
      return res.status(500);
    });
    newNotification.typeId = newLike._id;
    postToUpdate.likeCount++;
    findPostAndUpdateCount(
      req.params.postId,
      postToUpdate.likeCount,
      postToUpdate.commentCount
    ).catch(err => {
      console.error(err);
      return res.status(404);
    });
    const recipient = newNotification.recipient;
    const postId = req.params.postId;
    const sender = req.user.userHandle;
    const type = 'like';
    const typeId = newLike._id;
    createNotification(recipient, postId, sender, type, typeId);
    return res.status(200);
  }
};

/** Unlike a post
 * @type {RouteHandler}
 */
export const unlikePost = async (req, res, next) => {
  const post = await findPostById(req.params.postId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  const doc = remove(req).catch(err => {
    console.error(err);
    return res.stauts(500);
  });
  if (doc.postId === req.params.postId) {
    const postToUpdate = { ...post };
    const newNotification = {};
    newNotification.typeId = doc._id;
    postToUpdate.likeCount--;
    await findPostAndUpdateCount(
      req.params.postId,
      postToUpdate.likeCount,
      postToUpdate.commentCount
    );
    newNotification.type = 'like';
    deleteNotification(req);
    return res.status(200);
  } else {
    return res.status(500);
  }
};
