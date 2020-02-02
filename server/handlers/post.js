import _ from 'lodash';
import { getList, create, findAndDeletePost } from '../services/post.service';
import {
  findPostById,
  findCommentByPostId,
  findAndDeleteLikeAndComment,
} from './find';
import { deleteAllNotification } from './notification';

/** Retrieves a list of posts
 * @type {RouteHandler}
 */
export const getPostList = (req, res, next) =>
  new Promise(() => {
    getList()
      // Retrieves a list of posts, and
      // populates them in an array
      .then(data => {
        const postList = [];
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
        return res.status(200).send(postList);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });

/** Retrieves one post
 * @type {RouteHandler}
 */
export const getPost = (req, res) =>
  new Promise(() => {
    findPostById(req.params.postId)
      .then(returnPost => {
        const postData = { ...returnPost._doc };
        findCommentByPostId(returnPost._id)
          .then(data => {
            postData.commentList = [...data];
            return res.status(200).send(postData);
          })
          .catch(err => {
            console.error(err);
            return res.status(500).send(err);
          });
      })
      .catch(err => {
        console.error(err);
        return res.send(err);
      });
  });

/** Creates a single post
 * @type {RouteHandler}
 */
export const createPost = (req, res, next) =>
  new Promise(() => {
    create(req.body, req.user)
      .then(doc => {
        if (doc._id) {
          return res
            .status(201)
            .send({ message: `document ${doc._id} created successfully` });
        }
      })
      .catch(err => {
        console.error(err);
        return res.send(err);
      });
  });

/** Deletes post
 * @type {RouteHandler}
 */
export const deletePost = async (req, res, next) => {
  await findAndDeletePost(req.params.postId)
    .then(post => {
      if (post) {
        findAndDeleteLikeAndComment(req.params.postId).then(result => {
          deleteAllNotification(req.params.postId).then(() => {
            return res.status(200);
          });
        });
      }
      return res.status(200);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
};
