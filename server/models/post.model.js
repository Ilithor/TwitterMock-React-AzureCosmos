import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = Schema({
  createdAt: { type: Date, default: Date.now },
  body: {
    type: String,
    required: true,
  },
  userHandle: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    required: true,
  },
  commentCount: {
    type: Number,
    required: true,
  },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
