import jwt from 'jsonwebtoken';
import env from '../environment/environment';

/** Generates a new user token
 * @param {UserNew} user
 * @returns {Token}
 */
export const generateUserToken = user => {
  const token = jwt.sign({ _id: user._id }, env.jwt, {
    expiresIn: '12h',
  });
  token.concat({ token });
  return token;
};
