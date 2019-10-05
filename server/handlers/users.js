const userService = require('../services/user.service');
const { generateUserToken } = require('../handlers/token');
const { dataUri } = require('../util/multer');
const { authByToken } = require('../util/auth');
const { findById, findUserAndUpdateImage } = require('../handlers/find');

// Retrieves a list of users
exports.getUserList = (req, res, next) => {
  userService
    .getList()
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

// Registers an user
exports.registerUser = async (req, res, next) => {
  let token;
  userService
    .register(req.body)
    .then(data => {
      // If function returns object, user
      // failed validation checks
      if (data.id === undefined) {
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

// Logins an user
exports.loginUser = async (req, res, next) => {
  let token;
  userService
    .login(req.body)
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

/**Converts the uploaded image to base64 and uploades it
 * as a property in the User doc
 */
exports.imageUpload = async (req, res) => {
  let success;
  authByToken(req).then(_id => {
    findById(_id)
      .then(doc => {
        if (!doc.user) {
          let base64 = dataUri(req).content;
          success = findUserAndUpdateImage(doc, base64);
        } else {
          return res.status(500).json({ message: 'Something went wrong' });
        }
      })
      .then(() => {
        if (success) {
          return res
            .status(200)
            .json({ message: 'Image successfully uploaded' });
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err.code });
      });
  });
};
