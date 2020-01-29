import User from '../models/user.model';
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
import Like from '../models/like.model';
mongoConnect();

/** Returns a list of users
 * @returns {Promise<user[User]> | UserNotFound}
 */
export const getList = async () => {
  const error = {};
  const user = await User.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST)
    .limit(100);

  if (user.length === 0) {
    error.user = 'No users found';
    return error;
  }
  return user;
};

/** Returns a list of likes by userHandle
 * @param {string} userHandle
 * @returns {Promise<likeList[Like]> | Error}
 */
export const getLikeList = async userHandle => {
  const error = {};
  const likeList = await Like.find({})
    .read(mongo.ReadPreference.NEAREST)
    .limit(100);

  if (likeList.length === 0) {
    error.like = 'No likes found';
    return error;
  }
  return likeList;
};

/** Validates then creates new User
 * @param {UserRegistration} userParam
 * @return {Promise<newUser[User]> | UserError}
 */
export const register = async userParam => {
  const credential = {};
  const bio = {};
  const user = { credential, bio };

  // Validation
  const error = await validateRegister(userParam);

  if (Object.keys(error).length > 0) {
    return error;
  }

  // Create user
  user.handle = userParam.handle;
  user.credential.email = userParam.email;
  user.credential.password = userParam.password;
  user.bio.aboutMe = '';
  user.bio.website = '';
  user.bio.location = '';
  const newUser = new User(user);
  newUser.createdAt = new Date().toISOString();

  // Save user
  await newUser.save();

  return newUser;
};

/** Checks if user exists, and then generates a new token
 * @param {UserCredential} userParam
 * @return {Promise<userLoggedIn, dataToReturn> | UserCredentialError}
 */
export const login = async userParam => {
  const { email, password } = userParam;

  // Validation
  const user = {};
  let userLoggedIn;

  const error = await validateLogin(userParam);

  if (Object.keys(error).length > 0) {
    // Returns error if any, otherwise continue
    return error;
  } else {
    user.credential = { email, password };
    userLoggedIn = await findByCredential(user);
  }

  if (userLoggedIn.email || userLoggedIn.password) {
    return userLoggedIn;
  } else {
    const token = await generateUserToken(userLoggedIn);
    const dataToReturn = { token };
    dataToReturn.handle = userLoggedIn.handle;
    return dataToReturn;
  }
};

/** Updates the current user's bio properties
 * @param {Object} userParam
 * @param {string} userId
 * @return {Promise<boolean>}
 */
export const updateBio = async (userParam, userId) => {
  const userDetail = {};
  let success = false;

  userDetail.bio = await validateUserDetail(userParam);
  userParam.website = userDetail.bio.website;
  await findUserAndUpdateProfile(userDetail, userId).then(async () => {
    await findById(userId).then(async doc => {
      if (
        doc.bio.aboutMe === userParam.aboutMe &&
        doc.bio.website === userParam.website &&
        doc.bio.location === userParam.location
      ) {
        success = true;
        return success;
      }
    });
  });
  return success;
};
