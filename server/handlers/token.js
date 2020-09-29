import jwt from 'jsonwebtoken';
import env from '../config/environment';

/** Generates a new user token
 *
 * @param {NewUserData} user
 * @returns {TokenData}
 */
export const generateUserToken = user => {
  const token = jwt.sign({ _id: user._id }, env.jwt, {
    expiresIn: '12h',
  });
  token.concat({ token });
  return token;
};
