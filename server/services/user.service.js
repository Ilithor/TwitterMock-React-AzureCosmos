const User = require('../models/user.model');
const ReadPreference = require('mongodb').ReadPreference;
const jwt = require('jsonwebtoken');
const env = require('../environment/environment');

require('../mongo').connect();

module.exports = {
  registerUser,
  getUsers,
  generateUserToken
};

async function getUsers() {
  return await User.find({})
    .sort({ createdAt: -1 })
    .read(ReadPreference.NEAREST);
}

// Register route
async function registerUser(userParam) {
  // Password confirmation
  if (userParam.password !== userParam.confirmPassword) {
    return 'Password confirmation must match';
  }

  // Validation
  if (await User.findOne({ handle: userParam.handle })) {
    return 'User handle already exists';
  }

  if (await User.findOne({ email: userParam.email })) {
      return 'Email already exists'
  }

  const newUser = new User(userParam);
  newUser.createdAt = new Date().toISOString();

  // Save user
  await newUser.save();

  return newUser;
}

function generateUserToken(user) {
    const token = jwt.sign({_id: user._id }, env.jwt)
    token.concat({token});
    return token;
}