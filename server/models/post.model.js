import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
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
    default: 0,
    required: true,
  },
  commentCount: {
    type: Number,
    default: 0,
    required: true,
  },
});

export const Post = mongoose.model('Post', PostSchema);
