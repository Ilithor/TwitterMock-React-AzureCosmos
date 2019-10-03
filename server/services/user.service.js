const User = require('../models/user.model');
const ReadPreference = require('mongodb').ReadPreference;
const jwt = require('jsonwebtoken');
const env = require('../environment/environment');
const { isEmpty, isEmail } = require('../util/validators');
const { findByCredential, findUser } = require('../handlers/find');
const { generateUserToken } = require('../handlers/token');
const { validateLogin, validateRegister } = require('../util/validators');

require('../util/mongo').connect();

// Returns a list of users
exports.getList = async () => {
  return await User.find({})
    .sort({ createdAt: -1 })
    .read(ReadPreference.NEAREST);
};

// Register route
exports.register = async userParam => {
  // Validation
  let error = {};

  error = await validateRegister(userParam);

  if (Object.keys(error).length > 0) {
    return error;
  }

  // Create user
  const newUser = new User(userParam);
  newUser.createdAt = new Date().toISOString();

  // Save user
  //await newUser.save();

  return newUser;
};

// Checks if user exists, and then
// generates a new token
exports.login = async userParam => {
  const { email, password } = userParam;

  // Validation
  let error = {};
  let user;

  error = validateLogin(email, password);

  if (Object.keys(error).length > 0) {
    // Returns error if any, otherwise continue
    return error;
  } else {
    user = await findByCredential(email, password, error);
  }

  if (Object.keys(error).length > 0) {
    return error;
  }

  const token = generateUserToken(user);
  return token;
};
