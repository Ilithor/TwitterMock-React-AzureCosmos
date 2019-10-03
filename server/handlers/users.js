const userService = require('../services/user.service');
const { generateUserToken } = require('../handlers/token');

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
