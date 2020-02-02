import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**Creates new schema that dictates what properties
 * will occupy the User document
 */
const UserSchema = Schema({
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
  },
  bio: {
    userImage: String,
    aboutMe: String,
    website: String,
    location: String,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
