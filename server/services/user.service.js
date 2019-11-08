import User from '../models/user.model';
import mongo from 'mongodb';
import jwt from 'jsonwebtoken';
import env from '../environment/environment';
import { isEmpty, isEmail } from '../util/validators';
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
mongoConnect();

/** Returns a list of users
 * @returns {Promise<user[User], error>}
 */
export const getList = async () => {
  let user = [];
  let error = {};
  user = await User.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST);

  if (user.length === 0) {
    error.user = 'No users found';
    return error;
  } else {
    return user;
  }
};

/** Validates then creates new User
 * @param {UserRegistration} userParam
 */
export const register = async userParam => {
  // Validation
  let error = {};
  let credential = {};
  let bio = {};
  let user = { credential, bio };
  error = await validateRegister(userParam);

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
 */
export const login = async userParam => {
  const { email, password } = userParam;

  // Validation
  let error = {};
  let user = {};
  let userLoggedIn;
  let dataToReturn = {};

  error = await validateLogin(userParam);

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
    dataToReturn.token = token;
    dataToReturn.handle = userLoggedIn.handle;
    return dataToReturn;
  }
};

/** Updates the current user's bio properties
 * @param {Object} userParam
 * @param {string} userId
 * @returns {Promise<boolean>}
 */
export const updateBio = async (userParam, userId) => {
  let userDetail = {};
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
