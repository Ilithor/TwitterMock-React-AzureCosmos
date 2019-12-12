import User from '../models/user.model';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Checks if the email and password are valid
 * @param {UserCredential} user
 * @return {UserCredentialError}
 */
export const validateLogin = user => {
  let error = {};
  if (isEmpty(user.email)) {
    error.email = 'Must not be empty';
  } else if (!isEmail(user.email)) {
    error.email = 'Must be a valid email address';
  }

  if (isEmpty(user.password)) {
    error.password = 'Must not be empty';
  }

  return error;
};

/** Checks if the user inputs are valid
 * @param {UserRegistration} userParam
 * @return {UserError}
 */
export const validateRegister = async userParam => {
  let error = {};

  if (isEmpty(userParam.email)) {
    error.email = 'Must not be empty';
  } else if (!isEmail(userParam.email)) {
    error.email = 'Must be a valid email address';
  } else if (await User.findOne({ email: userParam.email })) {
    error.email = 'Already in use';
  }

  if (isEmpty(userParam.handle)) {
    error.handle = 'Must not be empty';
  } else if (await User.findOne({ handle: userParam.handle })) {
    error.handle = 'Already in use';
  }

  if (isEmpty(userParam.password)) {
    error.password = 'Must not be empty';
  } else if (userParam.password !== userParam.confirmPassword) {
    error.confirmPassword = 'Password confirmation must match';
  }

  return error;
};

/** Checks if the provided bio information is valid
 * @param {UserBioUpdate} userParam User's bio info
 * @return {UserBioUpdate}
 */
export const validateUserDetail = userParam => {
  let userDetail = { aboutMe: '', website: '', location: '' };
  let { aboutMe, website, location } = userParam;
  if (!isEmpty(aboutMe.trim())) {
    userDetail.aboutMe = aboutMe;
  }
  if (!isEmpty(website.trim())) {
    if (website.trim().substring(0, 4) !== 'http') {
      if (website.trim().substring(0, 3) !== 'www') {
        userDetail.website = `http://www.${website.trim()}`;
      } else {
        userDetail.website = `http://${website.trim()}`;
      }
    } else {
      userDetail.website = website;
    }
  }
  if (!isEmpty(location.trim())) {
    userDetail.location = location;
  }
  return userDetail;
};

/** Checks if provided string is empty
 * @param {string} string
 * @return {boolean}
 */
export const isEmpty = string => {
  if (string.trim() === '') {
    return true;
  } else {
    return false;
  }
};

/** Checks if provided email is valid
 * @param {string} email
 * @return {boolean}
 */
export const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) {
    return true;
  } else {
    return false;
  }
};
