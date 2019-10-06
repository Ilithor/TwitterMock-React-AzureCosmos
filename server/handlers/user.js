import { getList, register, login } from '../services/user.service';
import { generateUserToken } from './token';
import { dataUri } from '../util/multer';
import { authByToken } from '../util/auth';
import {
  findById,
  findUserAndUpdateImage,
  findUserAndUpdateProfile
} from './find';
import { validateUserDetail } from '../util/validators';

/** Retrieves the list of users
 * @type {RouteHandler}
 */
export const getUserList = (req, res, next) => {
  getList()
    // Retrieves a list of users, and
    // populates them in an array
    .then(data => {
      let users = [];
      data.forEach(user => {
        users.push({
          userId: user.id,
          email: user.email,
          password: user.password,
          handle: user.handle
        });
      });
      // Returns list of users in array
      return res.json(users);
    })
    .catch(err => {
      console.error(err);
    });
};

/** Registers the user
 * @type {RouteHandler}
 */
export const registerUser = async (req, res, next) => {
  let token;
  await register(req.body)
    .then(async data => {
      // If function returns object, user
      // failed validation checks
      if (!data.id) {
        return res.status(400).json({ error: data });
      } else {
        // If pass validation, generate user token
        token = await generateUserToken(data);
      }
    })
    .then(() => {
      if (token) {
        // Returns user token
        return res.status(201).json({ token });
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

/** Logins the user
 * @type {RouteHandler}
 */
export const loginUser = async (req, res, next) => {
  let token;
  await login(req.body)
    .then(data => {
      // If function does not return a string,
      // user failed validation checks
      if (typeof data !== 'string') {
        return res.status(403).json({ error: data });
      } else {
        token = data;
      }
    })
    .then(() => {
      // Returns user token
      if (token) {
        return res.json({ token });
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

/** Edits the current user's profile with the params provided by said user
 * @type {RouteHandler}
 */
export const addUserDetail = async (req, res, next) => {
  let { bio, website, location } = req.body;
  let userId;
  if (!bio && !website && !location) {
    return res
      .status(400)
      .json({ message: 'Provide at least one valid input' });
  }
  let userDetail = await validateUserDetail({ bio, website, location });
  website = userDetail.website;
  await authByToken(req)
    .then(async data => {
      userId = data;
      await findUserAndUpdateProfile(userDetail, userId);
    })
    .then(async () => {
      await findById(userId).then(doc => {
        if (
          doc.bio === bio &&
          doc.website === website &&
          doc.location === location
        ) {
          return res
            .status(200)
            .json({ message: 'Profile updated successfully' });
        }
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

/** Converts the uploaded image to base64 and uploads it as a property in the User doc
 * @type {RouteHandler}
 */
export const imageUpload = async (req, res, next) => {
  let base64, _id;
  if (!req.file) {
    return res.status(400).json({ message: 'No image provided' });
  }
  await authByToken(req)
    .then(async data => {
      _id = data;
      base64 = (await dataUri(req)).content;
      await findUserAndUpdateImage(_id, base64);
    })
    .then(async () => {
      await findById(_id).then(doc => {
        if (doc.image === base64) {
          return res
            .status(200)
            .json({ message: 'Image successfully uploaded' });
        }
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};
