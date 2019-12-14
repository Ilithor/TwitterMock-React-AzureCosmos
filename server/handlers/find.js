import User from '../models/user.model';
import Like from '../models/like.model';
import Notification from '../models/notification.model';
import Comment from '../models/comment.model';
import mongo from 'mongodb';

import mongoConnection from '../util/mongo';
import Post from '../models/post.model';
mongoConnection();

/**Returns a user that has a matching email and password
 * @param {UserRegistration} user
 * @return {Promise<User> | UserCredentialError}
 */
export const findByCredential = async user => {
  let error = {};

  const foundUser = await User.findOne({
    'credential.email': user.credential.email,
  });
  if (!foundUser) {
    error.email = 'Email does not exist';
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
 * @return {Promise<User> | UserNotFound}
 */
export const findById = async _id => {
  let error = {};
  let user = await User.findOne({
    _id,
  });
  if (!user) {
    error.user = 'User not found';
    return error;
  }
  return user;
};

/** Returns a user that matches handle
 * @param {string} handle
 * @return {Promise<User> | UserNotFound}
 */
export const findByHandle = async handle => {
  let error = {};
  let user = await User.findOne({
    handle: handle,
  });
  if (!user) {
    error.user = 'User not found';
    return error;
  }
  return user;
};

/** Returns post that matches _id
 * @param {string} _id
 * @return {Promise<Post> | PostNotFound}
 */
export const findPostById = async _id => {
  let error = {};
  let post = await Post.findOne({
    _id,
  });
  if (!post) {
    error.post = 'Post not found';
    return error;
  }
  return post;
};

/** Returns post that matches user handle
 * @param {string} handle
 * @return {Promise<Post> | PostNotFound}
 */
export const findPostByHandle = async handle => {
  let error = {};
  let post = await Post.find({
    userHandle: handle,
  })
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST);
  if (!post) {
    error.post = 'Post not found';
    return error;
  }
  return post;
};

/** Find all notifications by recipient
 * @param {string} recipient
 * @return {Promise<UserNotification> | NotificationNotFound}
 */
export const findNotificationByRecipient = async recipient => {
  let notification = [];
  let error = {};
  notification = Notification.find({
    recipient: recipient,
  })
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST);
  if (notification.length === 0) {
    error.notification = 'No notifications found';
    return error;
  } else {
    return notification;
  }
};

/** Fetches all comments attached to PostId
 * @param {string} _id
 * @return {Promise<UserComment> | NotificationNotFound}
 */
export const findCommentByPostId = async _id => {
  let comment = [];
  let error = {};
  comment = await Comment.find({
    postId: _id,
  })
    .sort({ createdAt: -1 })
    .read(mongo.ReadPreference.NEAREST);
  if (comment.length === 0) {
    error.comment = 'No comments found';
    return error;
  } else {
    return comment;
  }
};

/** Find all likes by userHandle
 * @param {string} handle
 * @return {Promise<Like> | []}
 */
export const findLikeByHandle = async handle => {
  let like = [];
  like = await Like.find({
    userHandle: handle,
  }).read(mongo.ReadPreference.NEAREST);

  if (like.length === 0) {
    return [];
  } else {
    return like;
  }
};

/** Finds all commenets by userHandle and PostId
 * @param {string} handle
 * @param {string} postId
 * @return {Promise<UserComment>}
 */
export const findCommentByHandleAndPostId = async (handle, postId) => {
  let comment = {};
  comment = await Comment.find({
    userHandle: handle,
    postId: postId,
  }).read(mongo.ReadPreference.NEAREST);
  return comment;
};

/** Finds all likes that match the provided user handle
 * @param {string} handle
 * @param {string} postId
 * @return {Promise<Like>}
 */
export const findLikeByHandleAndPostId = async (handle, postId) => {
  let like = {};
  like = await Like.find({
    userHandle: handle,
    postId: postId,
  }).read(mongo.ReadPreference.NEAREST);
  return like;
};

/** Updates all user posts with new image
 * @param {string} base64
 */
export const findAndUpdatePostImage = async (handle, base64) => {
  await Post.updateMany(
    {
      userHandle: handle,
    },
    {
      $set: {
        userImage: base64,
      },
    },
    {
      useFindAndModify: false,
    }
  );
};

/** Finds post and updates like/comment count
 * @param {string} _id
 * @param {Number} likeCount
 * @param {Number} commentCount
 */
export const findPostAndUpdateCount = async (_id, likeCount, commentCount) => {
  await Post.updateOne(
    {
      _id: _id,
    },
    {
      $set: {
        likeCount: likeCount,
        commentCount: commentCount,
      },
    },
    {
      useFindAndModify: false,
    }
  );
};

/** Finds and removes all likes and comments linked to a particular post
 * @param {string} postId
 * @return {boolean}
 */
export const findAndDeleteLikeAndComment = async postId => {
  let success = false;
  let like, comment;

  // Deletes all associated likes
  await Like.deleteMany({
    postId: postId,
  });

  // Deletes all associated comments
  await Comment.deleteMany({
    postId: postId,
  });

  // Checks for any leftover likes
  like = await Like.find({
    postId: postId,
  }).read(mongo.ReadPreference.NEAREST);

  // Checks for any leftover comments
  comment = await Comment.find({
    postId: postId,
  }).read(mongo.ReadPreference.NEAREST);

  /**
   * If both like.length and comment.length are 0
   * all likes and comments are deleted successfully
   */
  if (like.length === 0 && comment.length === 0) {
    success = true;
    return success;
  } else {
    return success;
  }
};

/** Finds notification and marks read as true
 * @param {string} notificationId
 */
export const findNotificationAndUpdateRead = async notificationId => {
  await Notification.updateOne(
    {
      _id: notificationId,
    },
    {
      $set: {
        read: true,
      },
    },
    {
      useFindAndModify: false,
    }
  );
};

/** Finds the exising user doc and updates the image property
 * @param {string} _id
 * @param {string} base64
 */
export const findUserAndUpdateImage = async (_id, base64) => {
  await User.updateOne(
    {
      _id: _id,
    },
    {
      $set: {
        'bio.image': base64,
      },
    },
    {
      useFindAndModify: false,
    }
  );
};

/** Finds and updates the user's profile bio
 * @param {UserBioUpdate} userDetails
 * @param {string} _id
 */
export const findUserAndUpdateProfile = async (userDetails, _id) => {
  let { aboutMe, website, location } = userDetails.bio;

  if (!aboutMe) {
    if (!website) {
      await User.updateOne(
        {
          _id: _id,
        },
        {
          $set: {
            'bio.location': location,
          },
        },
        {
          useFindAndModify: false,
        }
      );
    } else if (!location) {
      await User.updateOne(
        {
          _id: _id,
        },
        {
          $set: {
            'bio.website': website,
          },
        },
        {
          useFindAndModify: false,
        }
      );
    } else {
      await User.updateOne(
        {
          _id: _id,
        },
        {
          $set: {
            'bio.website': website,
            'bio.location': location,
          },
        },
        {
          useFindAndModify: false,
        }
      );
    }
  } else if (!website) {
    if (!location) {
      await User.updateOne(
        {
          _id: _id,
        },
        {
          $set: {
            'bio.aboutMe': aboutMe,
          },
        },
        {
          useFindAndModify: false,
        }
      );
    } else {
      await User.updateOne(
        {
          _id: _id,
        },
        {
          $set: {
            'bio.aboutMe': aboutMe,
            'bio.location': location,
          },
        },
        {
          useFindAndModify: false,
        }
      );
    }
  } else if (!location) {
    await User.updateOne(
      {
        _id: _id,
      },
      {
        $set: {
          'bio.aboutMe': aboutMe,
          'bio.website': website,
        },
      },
      {
        useFindAndModify: false,
      }
    );
  } else {
    await User.updateOne(
      {
        _id: _id,
      },
      {
        $set: {
          'bio.aboutMe': aboutMe,
          'bio.website': website,
          'bio.location': location,
        },
      },
      {
        useFindAndModify: false,
      }
    );
  }
};
