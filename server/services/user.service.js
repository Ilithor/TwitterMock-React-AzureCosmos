const User = require('../models/user.model');
const ReadPreference = require('mongodb').ReadPreference;
const jwt = require('jsonwebtoken');
const env = require('../environment/environment');

require('../mongo').connect();

module.exports = {
  register,
  getList,
  generateUserToken,
  isEmpty,
  login
};

async function getList() {
  return await User.find({})
    .sort({ createdAt: -1 })
    .read(ReadPreference.NEAREST);
}

// Register route
async function register(userParam) {
  // Validation
  let error = {};

  if (isEmpty(userParam.handle)) {
    error.handle = 'Must not be empty';
  } else if (await User.findOne({ handle: userParam.handle })) {
    error.handle = 'User handle already exists';
  }

  if (isEmpty(userParam.email)) {
    error.email = 'Must not be empty';
  } else if (!isEmail(userParam.email)) {
    error.email = 'Must be a valid email address';
  } else if (await User.findOne({ email: userParam.email })) {
    error.email = 'Email already exists';
  }

  if (isEmpty(userParam.password)) {
    error.password = 'Must not be empty';
  } else if (userParam.password !== userParam.confirmPassword) {
    error.password = 'Password confirmation must match';
  }

  if (Object.keys(error).length > 0) {
    return error;
  }

  // Create user
  const newUser = new User(userParam);
  newUser.createdAt = new Date().toISOString();

  // Save user
  await newUser.save();

  return newUser;
}

async function login(userParam) {
  const { email, password } = userParam;

  // Validation
  let error = {};

  if (isEmpty(email)) {
    error.email = 'Must not be empty';
  }

  if (isEmpty(password)) {
    error.password = 'Must not be empty';
  }

  const user = await findByCredential(email, password, error);

  if (Object.keys(error).length > 0) {
    return error;
  }

  const token = generateUserToken(user);
  return token;
}

function generateUserToken(user) {
  // Generates user token
  const token = jwt.sign({ _id: user._id }, env.jwt);
  token.concat({ token });
  return token;
}

async function findByCredential(email, password, error) {
  // Search for user by email/password
  const user = await User.findOne({ email });
  if (!user) {
    error.email = 'Invalid email';
    return error;
  }
  if (password !== user.password) {
    error.password = 'Invalid password';
    return error;
  }
  return user;
}

function isEmpty(string) {
  // Checks if provided string is empty
  if (string.trim() === '') {
    return true;
  } else {
    return false;
  }
}

function isEmail(email) {
  // Checks if valid email
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) {
    return true;
  } else {
    return false;
  }
}
