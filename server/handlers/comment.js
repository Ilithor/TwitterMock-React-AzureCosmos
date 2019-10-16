import { create } from '../services/comment.service';
import { findPostById, findPostAndUpdateCounts } from './find';

/** Create a comment on a post
 * @type {RouteHandler}
 */
export const commentOnPost = async (req, res) => {
  let postToUpdate = {};
  let newComment = {};
  await create(req)
    .then(comment => {
      if (comment.error) {
        return res.status(400).json({ error: comment.error });
      } else {
        newComment = comment;
        findPostById(req.params.postId).then(post => {
          if (post.post) {
            return res.status(404).json({ error: post.post });
          } else {
            postToUpdate = post;
            postToUpdate.commentCount++;
            findPostAndUpdateCounts(
              req.params.postId,
              postToUpdate.likeCount,
              postToUpdate.commentCount
            );
            return res.status(201).json({ newComment });
          }
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
