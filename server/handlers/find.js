import User from '../models/user.model';

import mongoConnection from '../util/mongo';
mongoConnection();

/**Returns a user that has a matching email and password
 * @type {UserRegistration}
 */
export const findByCredential = async user => {
  let error = {};

  const foundUser = await User.findOne({
    'credential.email': user.credential.email
  });
  if (!foundUser) {
    error.email = 'Invalid email';
    return error;
  }
  if (user.credential.password !== foundUser.credential.password) {
    error.password = 'Invalid password';
    return error;
  }
  return foundUser;
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
    { $set: { 'bio.image': base64 } },
    { useFindAndModify: false }
  );
};

/** Finds and updates the user's profile photo
 * @param {UserBioUpdate} userDetails
 * @param {string} _id
 */
export const findUserAndUpdateProfile = async (userDetails, _id) => {
  let { bio, website, location } = userDetails.bio;

  if (!bio) {
    if (!website) {
      await User.findByIdAndUpdate(
        { _id: _id },
        { $set: { 'bio.location': location } },
        { useFindAndModify: false }
      );
    } else if (!location) {
      await User.findByIdAndUpdate(
        { _id: _id },
        { $set: { 'bio.website': website } },
        { useFindAndModify: false }
      );
    } else {
      await User.findByIdAndUpdate(
        { _id: _id },
        { $set: { 'bio.website': website, 'bio.location': location } },
        { useFindAndModify: false }
      );
    }
  } else if (!website) {
    if (!location) {
      await User.findByIdAndUpdate(
        { _id: _id },
        { $set: { 'bio.bio': bio } },
        { useFindAndModify: false }
      );
    } else {
      await User.findByIdAndUpdate(
        { _id: _id },
        { $set: { 'bio.bio': bio, 'bio.location': location } },
        { useFindAndModify: false }
      );
    }
  } else if (!location) {
    await User.findByIdAndUpdate(
      { _id: _id },
      { $set: { 'bio.bio': bio, 'bio.website': website } },
      { useFindAndModify: false }
    );
  } else {
    await User.findByIdAndUpdate(
      { _id: _id },
      {
        $set: {
          'bio.bio': bio,
          'bio.website': website,
          'bio.location': location
        }
      },
      { useFindAndModify: false }
    );
  }
};
