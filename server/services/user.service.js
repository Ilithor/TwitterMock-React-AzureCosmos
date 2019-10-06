import User from '../models/user.model';
import mongo from 'mongodb';
import jwt from 'jsonwebtoken';
import env from '../environment/environment';
import { isEmpty, isEmail } from '../util/validators';
import { findByCredential, findById } from '../handlers/find';
import { generateUserToken } from '../handlers/token';
import { validateLogin, validateRegister } from '../util/validators';

import mongoConnect from '../util/mongo';
mongoConnect();

/** Returns a list of users
 * 
 */
export const getList = async () => {
  return await User.find({})
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST);
};

/** Validates then creates new User
 * @param {UserRegistration} userParam 
 */
export const register = async userParam => {
  // Validation
  let error = {};

  error = await validateRegister(userParam);

  if (Object.keys(error).length > 0) {
    return error;
  }

  // Create user
  const newUser = new User(userParam);
  newUser.createdAt = new Date().toISOString();

  // Save user
  await newUser.save();

  return newUser;
};

/** Checks if user exists, and then generates a new token
 * @param {UserLogin} userParam 
 */
export const login = async userParam => {
  const { email, password } = userParam;

  // Validation
  let error = {};
  let user;

  error = await validateLogin(email, password);

  if (Object.keys(error).length > 0) {
    // Returns error if any, otherwise continue
    return error;
  } else {
    user = await findByCredential(email, password, error);
  }

  if (Object.keys(error).length > 0) {
    return error;
  }

  const token = await generateUserToken(user);
  return token;
};
