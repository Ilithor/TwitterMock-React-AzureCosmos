import './type';
import jwt from 'jsonwebtoken';
import env from '../environment/environment';
import { findById } from '../handlers/find';

/** Checks if valid token is used
 * @type {RouteHandler}
 */
export const authUser = async (req, res, next) => {
  await this.authByToken(req)
    .then(async data => {
      // Checks to see if authUser returned
      // a token. Otherwise, an error occurred
      if (typeof data !== 'string') {
        return res.status(401).json({ error: data });
      } else {
        // Returns a document of type User
        return await findById(data);
      }
    })
    .then(async doc => {
      // Checks to see if doc.user is occupied
      // This indicates an error occurred
      if (typeof doc.user === 'string') {
        return res.status(401).json({ error: doc });
      } else if (typeof doc.handle === 'string') {
        return next();
      }
    })
    .catch(err => {
      console.error('Error while verifying token', err);
      return res.status(403).json(err);
    });
};

/** Decodes token and returns _id
 * @param {Request|string} req request passed in OR req.headers.authorization (both supported)
 */
export const authByToken = async req => {
  let error = {};
  let idToken, decoded;

  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.startsWith && req.startsWith('Bearer ')) {
    idToken = req.split('Bearer ')[1];
  } else {
    error.token = 'No proper token provided';
    return error;
  }

  try {
    decoded = await jwt.verify(idToken, env.jwt);
    return decoded._id;
  } catch (err) {
    error.token = 'Invalid token';
    return error;
  }
};
