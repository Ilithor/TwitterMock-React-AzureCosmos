import _ from 'lodash';
import { getList, create, findAndDeletePost } from '../services/post.service';
import {
  findPostById,
  findCommentByPostId,
  findAndDeleteLikeAndComment,
} from './find';
import { deleteAllNotification } from './notification';

/** Retrieves a list of posts
 *
 * @type {import('express').Handler}
 */
export const getPostList = async (req, res, next) => {
  const data = await getList().catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
  // Retrieves a list of posts, and
  // populates them in an array
  const postList = _.map(data, doc => ({
    postId: doc.id,
    body: doc.body,
    userHandle: doc.userHandle,
    createdAt: doc.createdAt,
    commentCount: doc.commentCount,
    likeCount: doc.likeCount,
    userImage: doc.userImage,
  }));
  // Returns list of posts in array
  return res.status(200).send(postList);
};

/** Retrieves one post
 *
 * @type {import('express').Handler}
 */
export const getPost = async (req, res) => {
  const returnPost = await findPostById(req.params.postId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  const postData = { ...returnPost._doc };
  const data = await findCommentByPostId(returnPost._id).catch(err => {
    console.error(err);
    return res.status(404);
  });
  postData.commentList = [...data];
  return res.status(200).send(postData);
};

/** Creates a single post
 *
 * @type {import('express').Handler}
 */
export const createPost = async (req, res, next) => {
  const doc = await create(req.body, req.user).catch(err => {
    console.error(err);
    return res.send(err);
  });
  if (doc._id) {
    return res.status(200).send(true);
  }
};

/** Deletes post
 *
 * @type {import('express').Handler}
 */
export const deletePost = async (req, res, next) => {
  const post = await findAndDeletePost(req.params.postId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  if (post) {
    findAndDeleteLikeAndComment(req.params.postId);
    deleteAllNotification(req.params.postId);
    return res.status(200).send(true);
  }
};
