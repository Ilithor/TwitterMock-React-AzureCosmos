import User from '../models/user.model';
import { getList, create, findAndDeletePost } from '../services/post.service';
import {
  findById,
  findPostById,
  findCommentByPostId,
  findAndDeleteLikeAndComment
} from './find';
import { authByToken } from '../util/auth';

/** Retrieves a list of posts
 * @type {RouteHandler}
 */
export const getPostList = (req, res, next) => {
  getList()
    // Retrieves a list of posts, and
    // populates them in an array
    .then(data => {
      let postList = [];
      data.forEach(doc => {
        postList.push({
          postId: doc.id,
          body: doc.body,
          userHandle: doc.userHandle,
          createdAt: doc.createdAt,
          commentCount: doc.commentCount,
          likeCount: doc.likeCount,
          userImage: doc.userImage
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
  let postData = {};
  await findPostById(req.params.postId).then(returnPost => {
    if (returnPost.post) {
      return res.status(404).json({ error: returnPost.post });
    }
    postData.post = returnPost;
    postData.comment = [];
    findCommentByPostId(returnPost._id)
      .then(post => {
        if (post.comment) {
          return res.status(404).json({ error: post.comment });
        }
        post.forEach(doc => {
          postData.comment.push(doc);
        });
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
      } else if (doc.body) {
        throw doc.body;
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

/** Deletes post
 * @type {RouteHandler}
 */
export const deletePost = async (req, res) => {
  await findAndDeletePost(req)
    .then(async post => {
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        if ((post._id = req.params.postId)) {
          await findAndDeleteLikeAndComment(post._id).then(success => {
            if (success) {
              res.json({ message: 'Post successfully deleted' });
            } else {
              res.status(500).json({ error: 'Something went wrong' });
            }
          });
        } else {
          res.status(500).json({ error: 'Post not found' });
        }
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
