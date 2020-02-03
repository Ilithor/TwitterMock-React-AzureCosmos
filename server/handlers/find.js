import { User } from '../models/user.model';
import { Like } from '../models/like.model';
import { Notification } from '../models/notification.model';
import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

/**Returns a user that has a matching email and password
 * @param {User} user
 * @returns {Promise<User|UserCredentialError>}
 */
export const findByCredential = async user => {
  const error = {};
  const foundUser = await User.findOne({
    'credential.email': user.credential.email,
  });
  if (!foundUser) {
    error.email = 'Email does not exist';
    return Promise.reject(error);
  }
  if (user.credential.password !== foundUser.credential.password) {
    error.password = 'Invalid password';
    return Promise.reject(error);
  }
  return foundUser;
};

/** Returns a user that matches _id
 * @param {string} _id
 * @returns {Promise<User|UserNotFound>}
 */
export const findById = async _id => {
  const error = {};
  const foundUser = await User.findOne({
    _id,
  });
  if (!foundUser) {
    error.user = 'User not found';
    return Promise.reject(error);
  }
  return foundUser;
};

/** Returns a user that matches handle
 * @param {string} userHandle
 * @returns {Promise<User|UserNotFound>}
 */
export const findByHandle = async userHandle => {
  const error = {};
  const foundUser = await User.findOne({
    userHandle,
  });
  if (!foundUser) {
    error.user = 'User not found';
    return error;
  }
  return foundUser;
};

/** Returns post that matches _id
 * @param {string} _id
 * @returns {Promise<Post|PostNotFound>}
 */
export const findPostById = async _id => {
  const error = {};
  const post = await Post.findOne({
    _id,
  });
  if (!post) {
    error.post = 'Post not found';
    return Promise.reject(error);
  }
  return post;
};

/** Returns post that matches user handle
 * @param {string} userHandle
 * @returns {Promise<Post|PostNotFound>}
 */
export const findPostByHandle = async userHandle => {
  const postList = await Post.find({
    userHandle,
  })
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST);
  return postList;
};

/** Fetches all comments attached to PostId
 * @param {string} postId
 * @returns {Promise<UserComment|NotificationNotFound>}
 */
export const findCommentByPostId = async postId => {
  const commentList = await Comment.find({
    postId,
  })
    .sort({ createdAt: 1 })
    .read(mongo.ReadPreference.NEAREST);
  return commentList;
};

/** Find all likes by userHandle
 * @param {string} userHandle
 * @returns {Promise<Like[]|any[]>}
 */
export const findLikeByHandle = async userHandle => {
  const likeList = await Like.find({
    userHandle,
  }).read(mongo.ReadPreference.NEAREST);
  return likeList;
};

/** Finds all commenets by userHandle and PostId
 * @param {string} userHandle
 * @param {string} postId
 * @returns {Promise<UserComment>}
 */
export const findCommentByHandleAndPostId = async (userHandle, postId) => {
  const commentList = await Comment.find({
    userHandle,
    postId,
  }).read(mongo.ReadPreference.NEAREST);
  return commentList;
};

/** Finds all likes that match the provided user handle
 * @param {String} userHandle
 * @param {String} postId
 * @returns {Promise<Like[]>}
 */
export const findLikeByHandleAndPostId = async (userHandle, postId) => {
  return await Like.findOne({
    userHandle,
    postId,
  }).read(mongo.ReadPreference.NEAREST);
};

/** Updates all user posts with new image
 * @param {String} userHandle
 * @param {String} base64
 */
export const findAndUpdatePostImage = async (userHandle, base64) => {
  await Post.updateMany(
    { userHandle },
    { $set: { userImage: base64 } },
    { useFindAndModify: false }
  );
};

/** Finds post and updates like/comment count
 * @param {string} _id
 * @param {Number} likeCount
 * @param {Number} commentCount
 */
export const findPostAndUpdateCount = async (_id, likeCount, commentCount) => {
  await Post.updateOne(
    { _id },
    { $set: { likeCount: likeCount, commentCount: commentCount } },
    { useFindAndModify: false }
  );
};

/** Finds and removes all likes and comments linked to a particular post
 * @param {string} postId
 * @returns {Promise<{like:any,comment:any}>}
 */
export const findAndDeleteLikeAndComment = postId =>
  new Promise((resolve, reject) => {
    try {
      // Deletes all associated likes
      const like = Like.deleteMany({ postId });

      // Deletes all associated comments
      const comment = Comment.deleteMany({ postId });
      resolve({ like, comment });
    } catch (err) {
      reject(err);
    }
  });

/** Finds notification and marks read as true
 * @param {string} _id
 */
export const findNotificationAndUpdateRead = async _id => {
  await Notification.updateOne(
    { _id },
    { $set: { read: true } },
    { useFindAndModify: false }
  );
};

/** Finds the exising user doc and updates the image property
 * @param {string} _id
 * @param {string} base64
 */
export const findUserAndUpdateImage = async (_id, base64) => {
  await User.updateOne(
    { _id },
    { $set: { 'bio.image': base64 } },
    { useFindAndModify: false }
  );
};

/** Finds and updates the user's profile bio
 * @param {User} userDetails
 * @param {string} _id
 */
export const findUserAndUpdateProfile = async (userDetails, _id) => {
  const { aboutMe, website, location } = userDetails.bio;

  if (!aboutMe) {
    if (!website) {
      // Only changes location
      await User.updateOne(
        { _id },
        { $set: { 'bio.location': location } },
        { useFindAndModify: false }
      );
    } else if (!location) {
      // Only changes website
      await User.updateOne(
        { _id },
        { $set: { 'bio.website': website } },
        { useFindAndModify: false }
      );
    } else {
      // Changes website and location
      await User.updateOne(
        { _id },
        { $set: { 'bio.website': website, 'bio.location': location } },
        { useFindAndModify: false }
      );
    }
  } else if (!website) {
    if (!location) {
      // Only changes aboutMe
      await User.updateOne(
        { _id },
        { $set: { 'bio.aboutMe': aboutMe } },
        { useFindAndModify: false }
      );
    } else {
      // Changes aboutMe and location
      await User.updateOne(
        { _id },
        { $set: { 'bio.aboutMe': aboutMe, 'bio.location': location } },
        { useFindAndModify: false }
      );
    }
  } else if (!location) {
    // Changes aboutMe and website
    await User.updateOne(
      { _id },
      { $set: { 'bio.aboutMe': aboutMe, 'bio.website': website } },
      { useFindAndModify: false }
    );
  } else {
    // Changes all 3 entries
    await User.updateOne(
      { _id },
      {
        $set: {
          'bio.aboutMe': aboutMe,
          'bio.website': website,
          'bio.location': location,
        },
      },
      { useFindAndModify: false }
    );
  }
};
