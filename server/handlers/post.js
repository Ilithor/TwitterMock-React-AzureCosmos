import _ from 'lodash';
import { getList, create, findAndDeletePost } from '../services/post.service';
import {
  findPostById,
  findCommentByPostId,
  findAndDeleteLikeAndComment,
} from './find';

/** Retrieves a list of posts
 * @type {RouteHandler}
 */
export const getPostList = (req, res, next) => {
  const postList = [];
  getList()
    // Retrieves a list of posts, and
    // populates them in an array
    .then(data => {
      _.map(data, doc => {
        postList.push({
          postId: doc.id,
          body: doc.body,
          userHandle: doc.userHandle,
          createdAt: doc.createdAt,
          commentCount: doc.commentCount,
          likeCount: doc.likeCount,
          userImage: doc.userImage,
        });
      });
      // Returns list of posts in array
      return res.json(postList);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

/** Retrieves one post
 * @type {RouteHandler}
 */
export const getPost = async (req, res) => {
  await findPostById(req.params.postId).then(returnPost => {
    if (returnPost.post) {
      return res.status(404).json({ error: returnPost.post });
    }
    const postData = { ...returnPost._doc };
    findCommentByPostId(returnPost._id)
      .then(data => {
        postData.commentList = [...data];
        return res.json(postData);
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
};

/** Creates a single post
 * @type {RouteHandler}
 */
export const createPost = async (req, res, next) => {
  await create(req.body, req.user)
    .then(doc => {
      if (doc._id) {
        return res
          .status(201)
          .json({ message: `document ${doc._id} created successfully` });
      } else {
        return res.status(400).json({ error: doc });
      }
    })
    .catch(err => {
      console.error(err);
      if (process.env.debug) {
        return res.status(500).json({
          message: err.message,
          error: 'Something went wrong',
        });
      } else {
        return res.status(500).json({ error: 'Something went wrong' });
      }
    });
};

/** Deletes post
 * @type {RouteHandler}
 */
export const deletePost = async (req, res, next) => {
  await findAndDeletePost(req)
    .then(async post => {
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        if ((post._id = req.params.postId)) {
          await findAndDeleteLikeAndComment(post._id).then(success => {
            if (success) {
              next();
            } else {
              return res.status(500).json({ error: 'Something went wrong' });
            }
          });
        } else {
          return res.status(500).json({ error: 'Post not found' });
        }
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
