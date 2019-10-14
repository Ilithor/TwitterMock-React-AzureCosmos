import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LikeSchema = Schema({
  userHandle: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  }
});

const Like = mongoose.model('Like', LikeSchema);

export default Like;
