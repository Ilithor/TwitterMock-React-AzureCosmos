import User from '../models/user.model';

import mongoConnection from '../util/mongo';
mongoConnection();

/**Returns a user that has a matching email and password
 * @param {string} email
 * @param {string} password
 * @param {UserError} error
 */
export const findByCredential = async (email, password, error) => {
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

/** Returns a user that matches _id
 * @param {string} _id 
 */
export const findById = async _id => {
  let error = {};
  const user = await User.findOne({ _id });
  if (!_id) {
    error.user = 'Does not exist';
    return error;
  }
  return user;
};

/** Finds the exising user doc and updates the image property
 * @param {string} _id 
 * @param {string} base64 
 */
export const findUserAndUpdateImage = async (_id, base64) => {
  await User.findOneAndUpdate(
    { _id: _id },
    { $set: { image: base64 } },
    { useFindAndModify: false }
  );
};

/** Finds and updates the user's profile photo
 * @param {UserBio} userDetails 
 * @param {string} _id 
 */
export const findUserAndUpdateProfile = async (userDetails, _id) => {
  const { bio, website, location } = userDetails;

  if (!bio) {
    if (!website) {
      if (!location) {
        return;
      } else {
        await User.findByIdAndUpdate(
          { _id: _id },
          { location: location },
          { useFindAndModify: false }
        );
      }
    } else if (!location) {
      await User.findByIdAndUpdate(
        { _id: _id },
        { website: website },
        { useFindAndModify: false }
      );
    } else {
      await User.findByIdAndUpdate(
        { _id: _id },
        { website: website, location: location },
        { useFindAndModify: false }
      );
    }
  } else if (!website) {
    if (!location) {
      await User.findByIdAndUpdate(
        { _id: _id },
        { bio: bio },
        { useFindAndModify: false }
      );
    } else {
      await User.findByIdAndUpdate(
        { _id: _id },
        { bio: bio, location: location },
        { useFindAndModify: false }
      );
    }
  } else if (!location) {
    await User.findByIdAndUpdate(
      { _id: _id },
      { bio: bio, website: website },
      { useFindAndModify: false }
    );
  } else {
    await User.findByIdAndUpdate(
      { _id: _id },
      { bio: bio, website: website, location: location },
      { useFindAndModify: false }
    );
  }
};
