import { User } from '../models/user.model';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Checks if the email and password are valid
 * @param {UserCredential} user
 * @returns {void}
 */
export const validateLogin = user => {
  if (isEmpty(user.email)) {
    return Promise.reject({ email: 'Must not be empty' });
  }
  if (!isEmail(user.email)) {
    return Promise.reject({ email: 'Must be a valid email address' });
  }
  if (isEmpty(user.password)) {
    return Promise.reject({ password: 'Must not be empty' });
  }
  return Promise.resolve();
};

/** Checks if the user inputs are valid
 * @param {UserRegistration} userParam
 * @returns {Promise<UserError>}
 */
export const validateRegister = async userParam => {
  let error;
  if (isEmpty(userParam.email)) {
    error = { email: 'Must not be empty' };
  } else if (!isEmail(userParam.email)) {
    error = { email: 'Must be a valid email address' };
  } else if (await User.findOne({ 'credential.email': userParam.email })) {
    error = { email: 'Already in use' };
  }
  if (isEmpty(userParam.userHandle)) {
    error = { ...error, userHandle: 'Must not be empty' };
  } else if (await User.findOne({ userHandle: userParam.userHandle })) {
    error = { ...error, userHandle: 'Already in use' };
  }
  if (isEmpty(userParam.password)) {
    error = { ...error, password: 'Must not be empty' };
  } else if (userParam.password !== userParam.confirmPassword) {
    error = { ...error, confirmPassword: 'Password confirmation must match' };
  }
  return Promise.resolve(error);
};

/** Checks if the provided bio information is valid
 * @param {UserBioUpdate} userParam User's bio info
 * @returns {Promise<UserBioUpdate>}
 */
export const validateUserDetail = userParam => {
  const userDetail = { aboutMe: '', website: '', location: '' };
  const { aboutMe, website, location } = userParam;
  if (!isEmpty(aboutMe.trim())) {
    userDetail.aboutMe = { ...aboutMe };
  }
  if (!isEmpty(website.trim())) {
    if (website.trim().substring(0, 4) !== 'http') {
      if (website.trim().substring(0, 3) !== 'www') {
        userDetail.website = `http://www.${website.trim()}`;
      } else {
        userDetail.website = `http://${website.trim()}`;
      }
    } else {
      userDetail.website = { ...website };
    }
  }
  if (!isEmpty(location.trim())) {
    userDetail.location = { ...location };
  }
  return Promise.resolve(userDetail);
};

/** Checks if provided string is empty
 * @param {String} string
 * @returns {Promise<Boolean>}
 */
export const isEmpty = string => {
  if (string.trim() === '') {
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
};

/** Checks if provided email is valid
 * @param {String} email
 * @returns {Promise<Boolean>}
 */
export const isEmail = email => {
  // eslint-disable-next-line no-useless-escape
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) {
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
};
