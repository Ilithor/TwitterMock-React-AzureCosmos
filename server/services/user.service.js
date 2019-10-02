const User = require('../models/user.model');
const ReadPreference = require('mongodb').ReadPreference;
const jwt = require('jsonwebtoken');
const env = require('../environment/environment');

require('../mongo').connect();

module.exports = {
  registerUser,
  getUsers,
  generateUserToken,
  isEmpty,
  loginUser
};

async function getUsers() {
  return await User.find({})
    .sort({ createdAt: -1 })
    .read(ReadPreference.NEAREST);
}

// Register route
async function registerUser(userParam) {
  // Validation
  let errors = {};

  if (isEmpty(userParam.handle)) {
    errors.handle = 'Must not be empty';
  } else if (await User.findOne({ handle: userParam.handle })) {
    errors.handle = 'User handle already exists';
  }

  if (isEmpty(userParam.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(userParam.email)) {
    errors.email = 'Must be a valid email address';
  } else if (await User.findOne({ email: userParam.email })) {
    errors.email = 'Email already exists';
  }

  if (isEmpty(userParam.password)) {
    errors.password = 'Must not be empty';
  } else if (userParam.password !== userParam.confirmPassword) {
    errors.password = 'Password confirmation must match';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newUser = new User(userParam);
  newUser.createdAt = new Date().toISOString();

  // Save user
  await newUser.save();

  return newUser;
}

async function loginUser(userParam) {
  const { email, password } = userParam;

  let errors = {};

  if (isEmpty(email)) {
    errors.email = 'Must not be empty';
  }

  if (isEmpty(password)) {
    errors.password = 'Must not be empty';
  }

  const user = await findByCredentials(email, password, errors);

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const token = generateUserToken(user);
  return token;
}

function generateUserToken(user) {
  const token = jwt.sign({ _id: user._id }, env.jwt);
  token.concat({ token });
  return token;
}

async function findByCredentials(email, password, errors) {
  // Search for user by email/password
  const user = await User.findOne({ email });
  if (!user) {
    errors.email = 'Invalid email';
    return errors;
  }
  if (password !== user.password) {
    errors.password = 'Invalid password';
    return errors;
  }
  return user;
}

function isEmpty(string) {
  if (string.trim() === '') {
    return true;
  } else {
    return false;
  }
}

function isEmail(email) {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) {
    return true;
  } else {
    return false;
  }
}
