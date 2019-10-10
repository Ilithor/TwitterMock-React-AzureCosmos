import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = Schema({
  createdAt: Date,
  body: { type: String, required: true },
  userHandle: { type: String, required: true }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
