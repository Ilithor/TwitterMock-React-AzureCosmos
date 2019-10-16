import { create, remove } from '../services/like.service';
import {
  findPostById,
  findLikeByHandleAndPostId,
  findPostAndUpdateCounts
} from './find';

/** Like a post
 * @type {RouteHandler}
 */
export const likePost = async (req, res) => {
  let postToUpdate = {};
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
          if (like[0]) {
            return res.status(400).json({ message: 'Like already exists' });
          } else {
            await create(req).then(async like => {
              postToUpdate.likeCount++;
              await findPostAndUpdateCounts(
                req.params.postId,
                postToUpdate.likeCount,
                postToUpdate.commentCount
              );
              return res.status(201).json({ like });
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
export const unlikePost = async (req, res) => {
  let postToUpdate = {};
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
            return res.status(400).json({ message: "Like doesn't exists" });
          } else {
            await remove(req).then(async doc => {
              if (doc.postId === req.params.postId) {
                postToUpdate.likeCount--;
                await findPostAndUpdateLikeCount(
                  req.params.postId,
                  postToUpdate.likeCount
                );
                return res
                  .status(200)
                  .json({ message: 'Like successfully removed' });
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
