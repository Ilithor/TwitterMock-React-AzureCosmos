import { create, remove } from '../services/like.service';
import {
  findPostById,
  findLikeByHandleAndPostId,
  findPostAndUpdateCount,
} from './find';

/** Like a post
 * @type {RouteHandler}
 */
export const likePost = async (req, res, next) => {
  let postToUpdate = {};
  req.notification = {};
  await findPostById(req.params.postId)
    .then(async post => {
      if (post.post) {
        return res.status(404).json({ error: post.post });
      } else {
        postToUpdate = post;
        req.notification.recipient = postToUpdate.userHandle;
        await findLikeByHandleAndPostId(
          req.user.handle,
          req.params.postId
        ).then(async like => {
          if (like.length !== 0) {
            return res.status(400).json({ message: 'Like already exists' });
          } else {
            await create(req).then(async like => {
              req.notification.typeId = like._id;
              postToUpdate.likeCount++;
              await findPostAndUpdateCount(
                req.params.postId,
                postToUpdate.likeCount,
                postToUpdate.commentCount
              );
              req.notification.type = 'like';
              req.notification.typeItem = like;
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

/** Unlike a post
 * @type {RouteHandler}
 */
export const unlikePost = async (req, res, next) => {
  let postToUpdate = {};
  req.notification = {};
  await findPostById(req.params.postId)
    .then(async post => {
      if (post.post) {
        return res.status(404).json({ error: post.post });
      } else {
        postToUpdate = post;
        await findLikeByHandleAndPostId(
          req.user.handle,
          req.params.postId
        ).then(async like => {
          if (!like[0]) {
            return res.status(400).json({ message: "Like doesn't exist" });
          } else {
            req.notification.typeId = like[0]._id;
            await remove(req).then(async doc => {
              if (doc.postId === req.params.postId) {
                postToUpdate.likeCount--;
                await findPostAndUpdateCount(
                  req.params.postId,
                  postToUpdate.likeCount,
                  postToUpdate.commentCount
                );
                req.notification.type = 'like';
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
