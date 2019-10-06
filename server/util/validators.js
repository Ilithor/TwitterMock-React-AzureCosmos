import User from '../models/user.model';

import mongoConnection from '../util/mongo';
mongoConnection();

/**
 * Checks if the email and password are valid
 * @param {string} email
 * @param {string} password
 */
export const validateLogin = (email, password) => {
  let error = {};

  if (isEmpty(email)) {
    error.email = 'Must not be empty';
  } else if (!isEmail(email)) {
    error.email = 'Must be a valid email address';
  }

  if (isEmpty(password)) {
    error.password = 'Must not be empty';
  }

  return error;
};

/** Checks if the user inputs are valid
 *  @param {UserRegistration} userParam
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
    error.password = 'Password confirmation must match';
  }

  return error;
};

/** Checks if the provided bio information is valid
 * @example look at *all* the bio
 * @param {UserBio} userBioInfo User's bio info
 */
export const validateUserDetail = ({ bio, website, location }) => {
  let userDetails = { bio: '', website: '', location: '' };
  if (!isEmpty(bio.trim())) {
    userDetails.bio = bio;
  }
  if (!isEmpty(website.trim())) {
    if (website.trim().substring(0, 4) !== 'http') {
      if (website.trim().substring(0, 3) !== 'www') {
        userDetails.website = `http://www.${website.trim()}`;
      } else {
        userDetails.website = `http://${website.trim()}`;
      }
    } else {
      userDetails.website = website;
    }
  }
  if (!isEmpty(location.trim())) {
    userDetails.location = location;
  }
  return userDetails;
};

// Checks if provided string is empty
export const isEmpty = string => {
  if (string.trim() === '') {
    return true;
  } else {
    return false;
  }
};

// Checks if provided email is valid
export const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) {
    return true;
  } else {
    return false;
  }
};
