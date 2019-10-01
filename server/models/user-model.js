const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userId: { type: Number, required: true, unique: true },
  createdAt: Date,
  email: String,
  password: String,
  handle: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
