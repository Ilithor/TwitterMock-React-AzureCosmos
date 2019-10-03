const jwt = require('jsonwebtoken');
const env = require('../environment/environment');

// Generates a new user token
exports.generateUserToken = user => {
  const token = jwt.sign({ _id: user._id }, env.jwt);
  token.concat({ token });
  return token;
};
