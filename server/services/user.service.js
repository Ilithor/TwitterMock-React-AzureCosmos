import mongo from 'mongodb';
import {
  findByCredential,
  findById,
  findUserAndUpdateProfile,
} from '../handlers/find';
import { generateUserToken } from '../handlers/token';
import {
  validateLogin,
  validateRegister,
  validateUserDetail,
} from '../util/validators';

import mongoConnect from '../util/mongo';
import { User } from '../models/user.model';
import { Like } from '../models/like.model';
mongoConnect();

/** Returns a list of users
 *
 * @returns {Promise<User[]>}
 */
export const getList = async () => {
  return await User.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST)
    .limit(100)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Returns a list of likes
 *
 * @param {string} userHandle
 * @returns {Promise<Like[]>}
 */
export const getLikeList = async () => {
  return await Like.find({})
    .read(mongo.ReadPreference.NEAREST)
    .limit(100)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Validates then creates new User
 *
 * @param {UserRegistration} userParam
 * @returns {Promise<UserNew>}
 */
export const register = async userParam => {
  const credential = {};
  const bio = {};
  const user = { credential, bio };

  // Validation
  const invalid = await validateRegister(userParam).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  if (invalid) {
    return Promise.reject(invalid);
  }

  // Create user
  user.userHandle = userParam.userHandle;
  user.credential.email = userParam.email;
  user.credential.password = userParam.password;
  user.bio.aboutMe = '';
  user.bio.website = '';
  user.bio.location = '';
  const newUser = new User(user);

  // Save user
  await newUser.save();
  return newUser;
};

/** Checks if user exists, and then generates a new token
 *
 * @param {UserCredential} userParam
 * @returns {Promise<{string}>}
 */
export const login = async userParam => {
  // Validation
  await validateLogin(userParam).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  const user = {};
  const { email, password } = userParam;
  user.credential = { email, password };
  const userLoggedIn = await findByCredential(user).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  const token = await generateUserToken(userLoggedIn).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  const dataToReturn = { token };
  dataToReturn.userHandle = userLoggedIn.userHandle;
  return dataToReturn;
};

/** Updates the current user's bio properties
 *
 * @param {object} userParam
 * @param {string} userId
 * @returns {Promise<boolean>}
 */
export const updateBio = async (userParam, userId) => {
  let success = false;
  const userDetail = {};
  userDetail.bio = await validateUserDetail(userParam).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  userParam.website = userDetail.bio.website;
  await findUserAndUpdateProfile(userDetail, userId).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  const doc = await findById(userId).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  if (
    doc.bio.aboutMe === userParam.aboutMe &&
    doc.bio.website === userParam.website &&
    doc.bio.location === userParam.location
  ) {
    return (success = true);
  } else {
    return success;
  }
};

/** Attempts to find and delete the user
 *
 * @param {string} userHandle
 * @returns {Promise<User>}
 */
export const findAndDeleteUser = async userHandle => {
  return await User.deleteOne({ userHandle }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};
