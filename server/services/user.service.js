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
export const getList = () =>
  new Promise(resolve => {
    const userList = User.find({})
      .sort({ createdAt: -1 })
      .read(mongo.ReadPreference.NEAREST)
      .limit(100);
    resolve(userList);
  });

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
export const register = userParam =>
  new Promise((resolve, reject) => {
    const credential = {};
    const bio = {};
    const user = { credential, bio };

    // Validation
    validateRegister(userParam)
      .then(async invalid => {
        if (invalid) {
          reject(invalid);
        } else {
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
          resolve(newUser);
        }
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });

/** Checks if user exists, and then generates a new token
 * @param {UserCredential} userParam
 * @returns {Promise<userLoggedIn, dataToReturn> | UserCredentialError}
 */
export const login = userParam =>
  new Promise((resolve, reject) => {
    // Validation
    validateLogin(userParam)
      .then(() => {
        const user = {};
        const { email, password } = userParam;
        user.credential = { email, password };
        findByCredential(user)
          .then(userLoggedIn => {
            if (!!userLoggedIn.email || !!userLoggedIn.password) {
              reject(userLoggedIn);
            } else {
              generateUserToken(userLoggedIn)
                .then(token => {
                  const dataToReturn = { token };
                  dataToReturn.userHandle = userLoggedIn.userHandle;
                  resolve(dataToReturn);
                })
                .catch(err => {
                  console.error(err);
                  reject(err);
                });
            }
          })
          .catch(err => {
            console.error(err);
            reject(err);
          });
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });

/** Updates the current user's bio properties
 * @param {Object} userParam
 * @param {string} userId
 * @returns {Promise<boolean>}
 */
export const updateBio = (userParam, userId) =>
  new Promise((resolve, reject) => {
    const userDetail = {};
    let success = false;
    userDetail.bio = validateUserDetail(userParam);
    userParam.website = userDetail.bio.website;
    findUserAndUpdateProfile(userDetail, userId)
      .then(() => {
        findById(userId)
          .then(doc => {
            if (
              doc.bio.aboutMe === userParam.aboutMe &&
              doc.bio.website === userParam.website &&
              doc.bio.location === userParam.location
            ) {
              success = true;
              resolve(success);
            }
            resolve(success);
          })
          .catch(err => {
            console.error(err);
            reject(err);
          });
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
