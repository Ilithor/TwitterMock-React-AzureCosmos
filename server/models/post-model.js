const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
  createdAt: { type: Date, required: true },
  body: { type: String, required: true },
  userHandle: { type: String, required: true }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
