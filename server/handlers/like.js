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
export const likePost = (req, res, next) =>
  new Promise(() => {
    findPostById(req.params.postId)
      .then(post => {
        console.log('post: ', post);
        if (post.post) {
          return res.send(post);
        } else {
          const postToUpdate = { ...post };
          req.notification = {};
          req.notification.recipient = postToUpdate.userHandle;
          findLikeByHandleAndPostId(req.user.userHandle, req.params.postId)
            .then(like => {
              console.log('like: ', like);
              if (like) {
                return res.send({ like: 'Like already exists' });
              } else {
                create(req)
                  .then(like => {
                    console.log('like2: ', like);
                    req.notification.typeId = like._id;
                    postToUpdate.likeCount++;
                    findPostAndUpdateCount(
                      req.params.postId,
                      postToUpdate.likeCount,
                      postToUpdate.commentCount
                    );
                    const recipient = req.notification.recipient;
                    const postId = req.params.postId;
                    const sender = req.user.userHandle;
                    const type = 'like';
                    const typeId = like._id;
                    createNotification(recipient, postId, sender, type, typeId);
                    return res.status(200);
                  })
                  .catch(err => {
                    console.error(err);
                    return res.status(500).send(err);
                  });
              }
            })
            .catch(err => {
              console.error(err);
              return res.status(500).send(err);
            });
        }
      })
      .catch(err => {
        console.error(err);
        return res.send(err);
      });
  });

/** Unlike a post
 * @type {RouteHandler}
 */
export const unlikePost = (req, res, next) =>
  new Promise(() => {
    findPostById(req.params.postId)
      .then(post => {
        remove(req)
          .then(doc => {
            if (doc.postId === req.params.postId) {
              const postToUpdate = post;
              req.notification = {};
              req.notification.typeId = doc._id;
              postToUpdate.likeCount--;
              findPostAndUpdateCount(
                req.params.postId,
                postToUpdate.likeCount,
                postToUpdate.commentCount
              );
              req.notification.type = 'like';
              deleteNotification(req);
              return res.status(200);
            } else {
              return res.status(500).send({ message: 'Something went wrong' });
            }
          })
          .catch(err => {
            console.error(err);
            return res.send(err);
          });
      })
      .catch(err => {
        console.error(err);
        return res.send(err);
      });
  });
