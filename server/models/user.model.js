const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const env = require('../environment/environment')

const userSchema = mongoose.Schema({
  createdAt: Date,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  handle: { type: String, unique: true, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
