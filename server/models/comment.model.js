import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = Schema({
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

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
