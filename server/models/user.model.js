import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  userHandle: {
    type: String,
    unique: true,
    required: true,
  },
  credential: {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  bio: {
    userImage: String,
    aboutMe: String,
    website: String,
    location: String,
  },
});

export const User = mongoose.model('User', UserSchema);
