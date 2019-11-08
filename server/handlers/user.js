import { getList, register, login, updateBio } from '../services/user.service';
import { generateUserToken } from './token';
import { dataUri } from '../util/multer';
import { authByToken } from '../util/auth';
import {
  findById,
  findUserAndUpdateImage,
  findUserAndUpdateProfile,
  findLikeByHandle,
  findByHandle,
  findPostByHandle,
  findAndUpdatePostImage,
} from './find';
import { validateUserDetail } from '../util/validators';
import Post from '../models/post.model';

/** Retrieves the list of users
 * @type {RouteHandler}
 */
export const getUserList = (req, res, next) => {
  getList()
    // Retrieves a list of users, and
    // populates them in an array
    .then(data => {
      if (data.user) {
        return res.status(404).json({ error: data.user });
      }

      let user = [];
      data.forEach(user => {
        user.push({
          userId: user.id,
          email: user.credential.email,
          password: user.credential.password,
          handle: user.handle,
        });
      });
      // Returns list of users in array
      return res.json(user);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

/** Registers the user
 * @type {RouteHandler}
 */
export const registerUser = async (req, res, next) => {
  let token;
  await register(req.body)
    .then(async data => {
      // If function returns object, user
      // failed validation checks
      if (!data.id) {
        return res.status(400).json({
          error: data,
        });
      } else {
        // If pass validation, generate user token
        token = await generateUserToken(data);
      }
    })
    .then(() => {
      if (token) {
        // Returns user token
        return res.status(201).json({
          token,
        });
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({
        general: 'Something went wrong, please try again',
      });
    });
};

/** Logins the user
 * @type {RouteHandler}
 */
export const loginUser = async (req, res, next) => {
  let token, handle;
  await login(req.body)
    .then(data => {
      // If function does not return a string,
      // user failed validation checks
      if (typeof data.token !== 'string') {
        return res.status(403).json({
          error: data,
        });
      } else {
        token = data.token;
        handle = data.handle;
      }
    })
    .then(() => {
      // Returns user token
      if (token) {
        return res.json({
          token,
          handle,
        });
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(403).json({
        general: 'Wrong credentials, please try again',
      });
    });
};

/** Get own user details
 * @type {RouteHandler}
 */
export const getAuthenticatedUser = async (req, res) => {
  let userData = {};
  userData.user = req.user;
  return await findLikeByHandle(userData._id)
    .then(arr => {
      if (arr.like) {
        return res.status(404).json({ error: arr.like });
      }
      userData.like = arr;
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

/** Retrieves any user details
 * @type {RouteHandler}
 */
export const getUserDetail = async (req, res) => {
  const { handle } = req.params; // this is called destructuring
  let userData = {};
  await findByHandle(handle).then(async user => {
    if (user.user) {
      //recursion check & block
      return res.status(500).json({ error: user.user });
    } else {
      userData.user = user;
      await findPostByHandle(handle)
        .then(async post => {
          if (post.post) {
            return res.status(500).json({ error: post.post });
          } else {
            userData.post = [];
            return res.json(await pushPostIntoArray(post, userData));
          }
        })
        .catch(err => {
          console.error(err);
          return res.status(500).json({ error: err.code });
        });
    }
  });
};

/** Pushes post docs into post array
 * @param {Document[]} post
 * @param {Object} userData
 */
const pushPostIntoArray = (post, userData) => {
  post.forEach(doc => {
    userData.post.push({
      body: doc.body,
      createdAt: doc.createdAt,
      userHandle: doc.userHandle,
      userImage: doc.userImage,
      likeCount: doc.likeCount,
      commentCount: doc.commentCount,
      postId: doc._id,
    });
  });
  return userData;
};

/** Edits the current user's profile with the params provided by said user
 * @type {RouteHandler}
 */
export const addUserDetail = async (req, res, next) => {
  let userParam = req.body;
  let userId = req.user._id;

  if (!userParam.aboutMe && !userParam.website && !userParam.location) {
    return res
      .status(400)
      .json({ message: 'At least one valid input is needed' });
  }

  await updateBio(userParam, userId)
    .then(async success => {
      console.log(success);
      if (success === true) {
        return res.status(200).json({
          message: 'Profile updated successfully',
        });
      } else {
        return res.status(500).json({ message: 'Something went wrong' });
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({
        error: err.code,
      });
    });
};

/** Converts the uploaded image to base64 and uploads it as a property in the User doc
 * @type {RouteHandler}
 */
export const imageUpload = async (req, res, next) => {
  let base64, _id;
  if (!req.file) {
    return res.status(400).json({
      message: 'No image provided',
    });
  }
  _id = req.user._id;
  base64 = (await dataUri(req)).content;
  await findUserAndUpdateImage(_id, base64)
    .then(async () => {
      await findById(_id).then(async doc => {
        if (doc.bio.image === base64) {
          await findAndUpdatePostImage(base64);
        }
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err.code,
      });
    });
};
