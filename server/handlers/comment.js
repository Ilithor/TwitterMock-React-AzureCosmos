import { create } from '../services/comment.service';

/** Create a comment on a post
 * @type {RouteHandler}
 */
export const commentOnPost = async (req, res) => {
  await create(req).then(comment => {
    return res.status(201).json({ comment });
  });
};
