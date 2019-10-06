import jwt from 'jsonwebtoken';
import env from '../environment/environment';

/** Generates a new user token
 * @param {UserNew} user 
 */
export const generateUserToken = async user => {
  const token = await jwt.sign({ _id: user._id }, env.jwt);
  token.concat({ token });
  return token;
};
