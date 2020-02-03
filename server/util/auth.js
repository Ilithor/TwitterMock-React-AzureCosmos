import './type';
import jwt from 'jsonwebtoken';
import env from '../environment/environment';
import { findById } from '../handlers/find';

/**
 * Checks if valid token is used
 * @type {RouteHandler}
 */
export const authUser = async (req, res, next) => {
  await this.authByToken(req)
    .then(async data => {
      // Returns a document of type User
      await findById(data)
        .then(doc => {
          req.user = doc;
          next();
        })
        .catch(err => {
          console.error(err);
          return Promise.reject(err);
        });
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Decodes token and returns _id
 *
 * @param {Request|string} req request passed in OR req.headers.authorization (both supported)
 * @returns {Promise<string>}
 */
export const authByToken = req => {
  let idToken;
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.startsWith && req.startsWith('Bearer ')) {
    idToken = req.split('Bearer ')[1];
  } else {
    return Promise.reject({ token: 'No proper token provided' });
  }
  try {
    const decoded = jwt.verify(idToken, env.jwt);
    return Promise.resolve(decoded._id);
  } catch (err) {
    return Promise.eject({ token: 'Invalid token' });
  }
};
