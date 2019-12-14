import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = Schema({
  createdAt: Date,
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
  userImage: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
