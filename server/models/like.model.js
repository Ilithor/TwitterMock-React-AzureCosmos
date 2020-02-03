import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  userHandle: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

export const Like = mongoose.model('Like', LikeSchema);
