import User from '../models/user.model';
import { getList, create } from '../services/post.service';
import { findById } from './find';
import { authByToken } from '../util/auth';

/** Retrieves a list of posts
 * @type {RouteHandler}
 */
export const getPostList = (req, res, next) => {
  getList()
    // Retrieves a list of posts, and
    // populates them in an array
    .then(data => {
      let posts = [];
      data.forEach(doc => {
        posts.push({
          postId: doc.id,
          body: doc.body,
          userHandle: doc.userHandle,
          createdAt: doc.createdAt,
          commentCount: doc.commentCount,
          likeCount: doc.likeCount
        });
      });
      // Returns list of posts in array
      return res.json(posts);
    })
    .catch(err => console.error(err));
};

/** Creates a single post
 * @type {RouteHandler}
 */
export const createPost = async (req, res, next) => {
  let docId;
  await authByToken(req)
    .then(async data => {
      await findById(data).then(async doc => {
        docId = (await create(req.body, doc.handle))._id;
        console.log(docId);
      });
      if (docId) {
        return res
          .status(201)
          .json({ message: `document ${docId} created successfully` });
      } else {
        throw 'Failed creating doc';
      }
    })
    .catch(err => {
      console.error(err);
      if (process.env.debug) {
        res.status(500).json({
          message: err.message,
          error: 'Something went wrong'
        });
      } else {
        res.status(500).json({ error: 'Something went wrong' });
      }
    });
};
