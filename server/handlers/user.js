import _ from 'lodash';
import {
  getList,
  getLikeList,
  register,
  login,
  updateBio,
} from '../services/user.service';
import { generateUserToken } from './token';
import { dataUri } from '../util/multer';
import {
  findById,
  findUserAndUpdateImage,
  findLikeByHandle,
  findByHandle,
  findPostByHandle,
} from './find';

/** Retrieves the list of users
 * @type {RouteHandler}
 */
export const getUserList = async (req, res, next) => {
  await getList()
    // Retrieves a list of users, and
    // populates them in an array
    .then(data => {
      const userList = _.map(data, user => ({
        userHandle: user.userHandle,
        userImage: user.bio.userImage,
        createdAt: user.createdAt,
        aboutMe: user.bio.aboutMe,
        location: user.bio.location,
        website: user.bio.website,
      }));
      // Returns list of users in array
      return res.status(200).json(userList);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err);
    });
};

export const fetchLikeList = async (req, res) => {
  await getLikeList()
    .then(data => {
      const likeList = _.map(data, like => ({
        userHandle: like.userHandle,
        postId: like.postId,
      }));
      // Returns list of likes in array
      return res.status(200).json(likeList);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err);
    });
};

/** Registers the user
 * @type {RouteHandler}
 */
export const registerUser = async (req, res, next) => {
  await register(req.body)
    .then(async user => {
      if (!user._id) {
        return res.send(user);
      } else {
        await generateUserToken(user)
          .then(token => {
            if (token) {
              // Returns user token and handle
              return res.status(201).json({ user, token });
            } else {
              return res.json(500).json({ message: 'Failed to create token' });
            }
          })
          .catch(err => {
            console.error(err);
            return res.send(err);
          });
      }
    })
    .catch(err => {
      console.error(err);
      return res.send(err);
    });
};

/** Logins the user
 * @type {RouteHandler}
 */
export const loginUser = async (req, res, next) => {
  await login(req.body)
    .then(data => {
      // Checks if token exists
      const token = data.token;
      const userHandle = data.userHandle;
      // Returns user token
      if (token && userHandle) {
        return res.send({ token, userHandle });
      } else {
        return res.status(500).send({ login: 'Failed to login user' });
      }
    })
    .catch(err => {
      console.error(err);
      return res.send(err);
    });
};

/** Get own user details
 * @type {RouteHandler}
 */
export const getAuthenticatedUser = async (req, res) => {
  const userData = {};
  userData.user = req.user;
  return await findLikeByHandle(userData._id)
    .then(arr => {
      userData.like = arr;
      return res.status(200).json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err);
    });
};

/** Retrieves any user details
 * @type {RouteHandler}
 */
export const getUserDetail = async (req, res) => {
  const { userHandle } = req.params;
  await findByHandle(userHandle)
    .then(async user => {
      const userData = {};
      userData.user = user;
      await findLikeByHandle(userHandle)
        .then(async data => {
          userData.like = data;
          await findPostByHandle(userHandle)
            .then(async postList => {
              res.send(await pushPostIntoArray(postList, userData));
            })
            .catch(err => {
              console.error(err);
              res.send(err);
            });
        })
        .catch(err => {
          console.error(err);
          res.send(err);
        });
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
};

/** Pushes post docs into post array
 * @param {Document[]} postList
 * @param {Object} userData
 * @returns {userData[Object]}
 */
const pushPostIntoArray = (postList, userData) =>
  new Promise(resolve => {
    userData.postList = [];
    _.map(postList, doc => {
      userData.postList.push({
        body: doc.body,
        createdAt: doc.createdAt,
        userHandle: doc.userHandle,
        userImage: doc.userImage,
        likeCount: doc.likeCount,
        commentCount: doc.commentCount,
        postId: doc._id,
      });
    });
    resolve(userData);
  });

/** Edits the current user's profile with the params provided by said user
 * @type {RouteHandler}
 */
export const addUserDetail = (req, res, next) =>
  new Promise(() => {
    const userParam = req.body;
    if (!userParam.aboutMe && !userParam.website && !userParam.location) {
      return res
        .status(400)
        .send({ general: 'At least one valid input is needed' });
    }
    const userId = req.user._id;
    updateBio(userParam, userId)
      .then(success => {
        if (success === true) {
          return res.status(200).send({
            message: 'Profile updated successfully',
          });
        } else {
          return res.status(500).send({ general: 'Something went wrong' });
        }
      })
      .catch(err => {
        console.error(err);
        return res.json(err);
      });
  });

/** Converts the uploaded image to base64 and uploads it as a property in the User doc
 * @type {RouteHandler}
 */
export const imageUpload = async (req, res, next) => {
  if (!req.file) {
    return Promise.reject({ general: 'No image provided' });
  }
  const _id = req.user._id;
  const base64 = dataUri(req).content;
  await findUserAndUpdateImage(_id, base64)
    .then(async () => {
      const doc = await findById(_id).catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
      if (doc.bio.userImage === base64) {
        return res.send(true);
      }
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};
