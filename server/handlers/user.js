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
  const data = await getList().catch(err => {
    console.error(err);
    return res.status(404);
  });
  // Retrieves a list of users, and
  // populates them in an array
  const userList = _.map(data, user => ({
    userHandle: user.userHandle,
    userImage: user.bio.userImage,
    createdAt: user.createdAt,
    aboutMe: user.bio.aboutMe,
    location: user.bio.location,
    website: user.bio.website,
  }));
  // Returns list of users in array
  return res.status(200).send(userList);
};

export const fetchLikeList = async (req, res) => {
  const data = await getLikeList().catch(err => {
    console.error(err);
    return res.status(404);
  });
  const likeList = _.map(data, like => ({
    userHandle: like.userHandle,
    postId: like.postId,
  }));
  // Returns list of likes in array
  return res.status(200).send(likeList);
};

/** Registers the user
 * @type {RouteHandler}
 */
export const registerUser = async (req, res, next) => {
  const user = await register(req.body).catch(err => {
    console.error(err);
    return res.send(err);
  });
  const token = await generateUserToken(user).catch(err => {
    console.error(err);
    return res.status(500);
  });
  if (token) {
    // Returns user token and handle
    return res.status(201).send({ user, token });
  } else {
    return res.send(500);
  }
};

/** Logins the user
 * @type {RouteHandler}
 */
export const loginUser = async (req, res, next) => {
  const data = await login(req.body).catch(err => {
    console.error(err);
    return res.send(err);
  });
  // Checks if token exists
  const token = data.token;
  const userHandle = data.userHandle;
  // Returns user token
  if (token && userHandle) {
    return res.send({ token, userHandle });
  } else {
    return res.status(500);
  }
};

/** Get own user details
 * @type {RouteHandler}
 */
export const getAuthenticatedUser = async (req, res) => {
  const userData = {};
  userData.user = { ...req.user };
  const arr = await findLikeByHandle(userData._id).catch(err => {
    console.error(err);
    return res.status(404);
  });
  userData.like = [...arr];
  return res.status(200).send(userData);
};

/** Retrieves any user details
 * @type {RouteHandler}
 */
export const getUserDetail = async (req, res) => {
  const { userHandle } = req.params;
  const user = await findByHandle(userHandle).catch(err => {
    console.error(err);
    res.status(404);
  });
  const userData = {};
  userData.user = user;
  const data = await findLikeByHandle(userHandle).catch(err => {
    console.error(err);
    res.status(404);
  });
  userData.like = [...data];
  const postList = await findPostByHandle(userHandle).catch(err => {
    console.error(err);
    res.status(404);
  });
  const userResult = await pushPostIntoArray(postList, userData).catch(err => {
    console.error(err);
    return res.status(500);
  });
  res.status(200).send(userResult);
};

/** Pushes post docs into post array
 * @param {Document[]} postList
 * @param {Object} userData
 * @returns {userData[Object]}
 */
const pushPostIntoArray = (postList, userData) => {
  userData.post = _.map(postList, doc => ({
    body: doc.body,
    createdAt: doc.createdAt,
    userHandle: doc.userHandle,
    userImage: doc.userImage,
    likeCount: doc.likeCount,
    commentCount: doc.commentCount,
    postId: doc._id,
  }));
  return Promise.resolve(userData);
};

/** Edits the current user's profile with the params provided by said user
 * @type {RouteHandler}
 */
export const addUserDetail = async (req, res, next) => {
  const userParam = { ...req.body };
  if (!userParam.aboutMe && !userParam.website && !userParam.location) {
    return res.send({ general: 'At least one valid input is needed' });
  }
  const userId = req.user._id;
  const success = await updateBio(userParam, userId).catch(err => {
    console.error(err);
    return res.status(500);
  });
  if (success === true) {
    return res.status(200);
  } else {
    return res.status(500);
  }
};

/** Converts the uploaded image to base64 and uploads it as a property in the User doc
 * @type {RouteHandler}
 */
export const imageUpload = async (req, res, next) => {
  if (!req.file) {
    return res.send({ general: 'No image provided' });
  }
  const _id = req.user._id;
  const base64 = await dataUri(req).content;
  await findUserAndUpdateImage(_id, base64).catch(err => {
    console.error(err);
    return res.status(404);
  });
  const doc = await findById(_id).catch(err => {
    console.error(err);
    return res.status(404);
  });
  if (doc.bio.userImage === base64) {
    return res.status(200).send(true);
  }
};
