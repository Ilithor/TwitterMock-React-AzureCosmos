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
 * @returns {Promise<user[User]>}
 */
export const getList = async () => {
  return await User.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST)
    .limit(100);
};

/** Returns a list of likes by userHandle
 * @param {String} userHandle
 * @returns {Promise<likeList[Like]>}
 */
export const getLikeList = async userHandle => {
  return await Like.find({ userHandle })
    .read(mongo.ReadPreference.NEAREST)
    .limit(100);
};

/** Validates then creates new User
 * @param {UserRegistration} userParam
 * @returns {Promise<newUser[User]> | UserError}
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
  user.userHandle = { ...userParam.userHandle };
  user.credential.email = { ...userParam.email };
  user.credential.password = { ...userParam.password };
  user.bio.aboutMe = '';
  user.bio.website = '';
  user.bio.location = '';
  const newUser = new User(user);

  // Save user
  await newUser.save();
  return Promise.resolve(newUser);
};

/** Checks if user exists, and then generates a new token
 * @param {UserCredential} userParam
 * @returns {Promise<userLoggedIn, dataToReturn> | UserCredentialError}
 */
export const login = async userParam => {
  // Validation
  await validateLogin(userParam)
    .then(async () => {
      const user = {};
      const { email, password } = userParam;
      user.credential = { email, password };
      const userLoggedIn = await findByCredential(user).catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
      if (!!userLoggedIn.email || !!userLoggedIn.password) {
        return Promise.reject(userLoggedIn);
      } else {
        const token = await generateUserToken(userLoggedIn).catch(err => {
          console.error(err);
          return Promise.reject(err);
        });
        const dataToReturn = { token };
        dataToReturn.userHandle = { ...userLoggedIn.userHandle };
        return Promise.resolve(dataToReturn);
      }
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Updates the current user's bio properties
 * @param {Object} userParam
 * @param {string} userId
 * @returns {Promise<boolean>}
 */
export const updateBio = async (userParam, userId) => {
  const userDetail = {};
  let success = false;
  userDetail.bio = await validateUserDetail(userParam);
  userParam.website = { ...userDetail.bio.website };
  await findUserAndUpdateProfile(userDetail, userId)
    .then(async () => {
      const doc = await findById(userId).catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
      if (
        doc.bio.aboutMe === userParam.aboutMe &&
        doc.bio.website === userParam.website &&
        doc.bio.location === userParam.location
      ) {
        success = true;
        return Promise.resolve(success);
      }
      return Promise.resolve(success);
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};
