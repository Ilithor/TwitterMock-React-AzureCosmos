const User = require('../models/user.model');

require('../util/mongo').connect();

// Returns a user that has a matching
// email and password
exports.findByCredential = async (email, password, error) => {
  const user = await User.findOne({ email });
  if (!user) {
    error.email = 'Invalid email';
    return error;
  }
  if (password !== user.password) {
    error.password = 'Invalid password';
    return error;
  }
  return user;
};

// Returns a user that matches _id
exports.findById = async _id => {
  let error = {};
  const user = await User.findOne({ _id });
  if (!_id) {
    error.user = 'Does not exist';
    return error;
  }
  return user;
};

/**Finds the exising user doc and updates the image property */
exports.findUserAndUpdateImage = async (doc, base64) => {
  await User.findOneAndUpdate(
    { _id: doc._id },
    { $set: { image: base64 } },
    { useFindAndModify: false, returnDocument: true }
  );
};
