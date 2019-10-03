const User = require('../models/user.model');

require('../util/mongo').connect();

exports.validateLogin = (email, password) => {
  error = {};

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

exports.validateRegister = async userParam => {
  error = {};

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

// Checks if provided string is empty
isEmpty = string => {
  if (string.trim() === '') {
    return true;
  } else {
    return false;
  }
};

// Checks if provided email is valid
isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) {
    return true;
  } else {
    return false;
  }
};
