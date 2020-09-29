import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { Like } from '../models/like.model';
import { Notification } from '../models/notification.model';
import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
mongoConnection();

/**Returns a user that has a matching email and password
 *
 * @param {UserData} user
 * @returns {Promise<UserData>}
 */
export const findByCredential = async user => {
  const error = {};
  const foundUser = await User.findOne({
    'credential.email': user.credential.email,
  }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  if (!foundUser) {
    error.email = 'Email does not exist';
    return Promise.reject(error);
  }
  const checkPassword = await bcrypt
    .compare(user.credential.password, foundUser.credential.password)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
  if (!checkPassword) {
    error.password = 'Invalid password';
    return Promise.reject(error);
  }
  return Promise.resolve(foundUser);
};

/** Returns a user that matches _id
 *
 * @param {string} _id
 * @returns {Promise<UserData>}
 */
export const findById = async _id => {
  return await User.findOne({
    _id,
  }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};

/** Returns a user that matches handle
 *
 * @param {string} userHandle
 * @returns {Promise<UserData>}
 */
export const findByHandle = async userHandle => {
  return await User.findOne({
    userHandle,
  }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};

/** Returns post that matches _id
 *
 * @param {string} _id
 * @returns {Promise<PostData>}
 */
export const findPostById = async _id => {
  return await Post.findOne({
    _id,
  }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};

/** Returns post that matches user handle
 *
 * @param {string} userHandle
 * @returns {Promise<PostData>}
 */
export const findPostByHandle = async userHandle => {
  return await Post.find({
    userHandle,
  })
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Fetches all comments attached to PostId
 *
 * @param {string} postId
 * @returns {Promise<CommentData>}
 */
export const findCommentByPostId = async postId => {
  return await Comment.find({
    postId,
  })
    .sort({ createdAt: 1 })
    .read(mongo.ReadPreference.NEAREST)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Find all likes by userHandle
 *
 * @param {string} userHandle
 * @returns {Promise<LikeData[]|any[]>}
 */
export const findLikeByHandle = async userHandle => {
  return await Like.find({
    userHandle,
  })
    .read(mongo.ReadPreference.NEAREST)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Finds all commenets by userHandle and PostId
 *
 * @param {string} userHandle
 * @param {string} postId
 * @returns {Promise<CommentData>}
 */
export const findCommentByHandleAndPostId = async (userHandle, postId) => {
  return await Comment.find({
    userHandle,
    postId,
  })
    .read(mongo.ReadPreference.NEAREST)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Finds all likes that match the provided user handle
 *
 * @param {string} userHandle
 * @param {string} postId
 * @returns {Promise<LikeData[]>}
 */
export const findLikeByHandleAndPostId = async (userHandle, postId) => {
  return await Like.findOne({
    userHandle,
    postId,
  })
    .read(mongo.ReadPreference.NEAREST)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Updates all user posts with new image
 *
 * @param {string} userHandle
 * @param {string} base64
 * @returns {Promise}
 */
export const findAndUpdatePostImage = async (userHandle, base64) => {
  await Post.updateMany(
    { userHandle },
    { $set: { userImage: base64 } },
    { useFindAndModify: false }
  ).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};

/** Finds and updates user's password
 *
 * @param {string} userHandle
 * @param {string} password
 * @returns {Promise}
 */
export const findAndUpdatePassword = async (userHandle, password) => {
  await User.updateOne(
    { userHandle },
    { $set: { 'credential.password': password } },
    { userFindAndModify: false }
  ).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};

/** Finds post and updates like/comment count
 *
 * @param {string} _id
 * @param {number} likeCount
 * @param {number} commentCount
 * @returns {Promise}
 */
export const findPostAndUpdateCount = async (_id, likeCount, commentCount) => {
  await Post.updateOne(
    { _id },
    { $set: { likeCount, commentCount } },
    { useFindAndModify: false }
  ).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};

/** Finds and removes all likes and comments linked to a particular post
 *
 * @param {string} postId
 * @returns {Promise<{like:any,comment:any}>}
 */
export const findAndDeleteLikeAndComment = async postId => {
  const like = await Like.deleteMany({ postId }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  const comment = await Comment.deleteMany({ postId }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  return { like, comment };
};

/** Finds notification and marks read as true
 *
 * @param {string} _id
 * @returns {Promise}
 */
export const findNotificationAndUpdateRead = async _id => {
  await Notification.updateOne(
    { _id },
    { $set: { read: true } },
    { useFindAndModify: false }
  ).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};

/** Finds the exising user doc and updates the image property
 *
 * @param {string} _id
 * @param {string} base64
 * @returns {Promise}
 */
export const findUserAndUpdateImage = async (_id, base64) => {
  await User.updateOne(
    { _id },
    { $set: { 'bio.userImage': base64 } },
    { useFindAndModify: false }
  ).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};

/** Finds and updates the user's profile bio
 *
 * @param {UserData} userDetail
 * @param {string} _id
 * @returns {Promise}
 */
export const findUserAndUpdateProfile = async (userDetail, _id) => {
  const { aboutMe, website, location } = userDetail.bio;

  if (!aboutMe) {
    if (!website) {
      // Only changes location
      await User.updateOne(
        { _id },
        { $set: { 'bio.location': location } },
        { useFindAndModify: false }
      ).catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
    } else if (!location) {
      // Only changes website
      await User.updateOne(
        { _id },
        { $set: { 'bio.website': website } },
        { useFindAndModify: false }
      ).catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
    } else {
      // Changes website and location
      await User.updateOne(
        { _id },
        { $set: { 'bio.website': website, 'bio.location': location } },
        { useFindAndModify: false }
      ).catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
    }
  } else if (!website) {
    if (!location) {
      // Only changes aboutMe
      await User.updateOne(
        { _id },
        { $set: { 'bio.aboutMe': aboutMe } },
        { useFindAndModify: false }
      ).catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
    } else {
      // Changes aboutMe and location
      await User.updateOne(
        { _id },
        { $set: { 'bio.aboutMe': aboutMe, 'bio.location': location } },
        { useFindAndModify: false }
      ).catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
    }
  } else if (!location) {
    // Changes aboutMe and website
    await User.updateOne(
      { _id },
      { $set: { 'bio.aboutMe': aboutMe, 'bio.website': website } },
      { useFindAndModify: false }
    ).catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
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
    ).catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
  }
};

/** Attempts to find and delete a notification
 *
 * @param {string} typeId
 * @returns {Promise}
 */
export const findAndDeleteNotification = async typeId => {
  await Notification.deleteOne({ typeId }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};

/** Finds all user's posts and deletes them
 *
 * @param {string} userHandle
 * @returns {Promise}
 */
export const findAndDeleteAllPosts = async userHandle => {
  await Post.deleteMany({ userHandle }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};
