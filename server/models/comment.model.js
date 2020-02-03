import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  body: {
    type: String,
    required: true,
  },
  userHandle: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

export const Comment = mongoose.model('Comment', CommentSchema);
