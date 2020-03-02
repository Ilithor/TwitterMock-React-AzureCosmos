import _ from 'lodash';

import { User } from '../models/user.model';

import mongoConnection from '../util/mongo';
mongoConnection();

/** Checks if the email and password are valid
 *
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
  return;
};

/** Checks if the user inputs are valid
 *
 * @param {UserRegistration} userParam
 * @returns {Promise<UserError>}
 */
export const validateRegister = async userParam => {
  let error;
  if (await User.findOne({ 'credential.email': userParam.email })) {
    error = { email: 'Already in use' };
  }
  if (await User.findOne({ userHandle: userParam.userHandle })) {
    error = { ...error, userHandle: 'Already in use' };
  }
  return error;
};

/** Checks if the provided bio information is valid
 *
 * @param {UserBioUpdate} userParam User's bio info
 * @returns {UserBioUpdate}
 */
export const validateUserDetail = userParam => {
  const userDetail = { aboutMe: '', website: '', location: '' };
  const { aboutMe, website, location } = userParam;
  if (
    isEmpty(aboutMe.trim()) &&
    isEmpty(website.trim()) &&
    isEmpty(website.trim())
  ) {
    const err = {
      general:
        'At least one field must be filled before this form can be submitted!',
    };
    return Promise.reject(err);
  }
  const validatedWebsite = isWebsite(website);
  if (!validatedWebsite) {
    const err = { website: 'Must be a valid website' };
    return Promise.reject(err);
  }
  userDetail.aboutMe = aboutMe;
  userDetail.website = validatedWebsite;
  userDetail.location = location;
  return userDetail;
};

/** Checks if provided string is empty
 *
 * @param {string} string
 * @returns {boolean}
 */
export const isEmpty = string => {
  if (string.trim() === '') {
    return true;
  } else {
    return false;
  }
};

/** Checks if provided email is valid
 *
 * @param {string} email
 * @returns {boolean}
 */
export const isEmail = email => {
  // eslint-disable-next-line no-useless-escape
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) {
    return true;
  } else {
    return false;
  }
};

/** Checks if provided website is valid
 *
 * @param {string} website
 * @returns {website}
 */
export const isWebsite = website => {
  if (!_.includes(website, '.')) {
    return false;
  }
  if (!_.includes(website, '://')) {
    website = `http://${website}`;
  }
  return website;
};
