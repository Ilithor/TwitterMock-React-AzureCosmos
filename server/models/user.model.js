import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import env from '../environment/environment';

/**Creates new schema that dictates what properties
 * will occupy the User document
 */
export const UserSchema = mongoose.Schema({
  createdAt: Date,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  handle: { type: String, unique: true, required: true },
  bio: String,
  website: String,
  location: String,
  image: String
});

const User = mongoose.model('User', UserSchema);

export default User;
