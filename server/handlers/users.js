const { getList, register, login } = require('../services/user.service');
const { generateUserToken } = require('../handlers/token');
const { dataUri } = require('../util/multer');
const { authByToken } = require('../util/auth');
const {
  findById,
  findUserAndUpdateImage,
  findUserAndUpdateProfile
} = require('../handlers/find');

/**Retrieves the list of users */
exports.getUserList = (req, res, next) => {
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

/**Registers the user */
exports.registerUser = async (req, res, next) => {
  let token;
  register(req.body)
    .then(data => {
      // If function returns object, user
      // failed validation checks
      if (!data.id) {
        return res.status(400).json({ error: data });
      } else {
        // If pass validation, generate user token
        token = generateUserToken(data);
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

/**Logins the user */
exports.loginUser = async (req, res, next) => {
  let token;
  login(req.body)
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

/**Edits the current user's profile with the
 * params provided by said user
 */
exports.addUserDetails = (req, res) => {
  const { bio, website, location } = req.body;
  let _id;
  authByToken(req)
    .then(data => {
      _id = data;
      findUserAndUpdateProfile(req.body, _id);
    })
    .then(() => {
      findById(_id).then(doc => {
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

/**Converts the uploaded image to base64 and uploads it
 * as a property in the User doc
 */
exports.imageUpload = async (req, res) => {
  let base64, _id;
  authByToken(req)
    .then(data => {
      _id = data;
      base64 = dataUri(req).content;
      success = findUserAndUpdateImage(_id, base64);
    })
    .then(() => {
      findById(_id).then(doc => {
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
