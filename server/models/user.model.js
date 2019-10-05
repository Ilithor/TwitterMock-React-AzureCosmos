const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const env = require('../environment/environment');

/**Creates new schema that dictates what properties
 * will occupy the User document
 */
const userSchema = mongoose.Schema({
  createdAt: Date,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  handle: { type: String, unique: true, required: true },
  bio: String,
  website: String,
  location: String,
  image: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
