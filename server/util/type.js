/**
 * @typedef UserCredentialData
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef UserCredentialDataError
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef UserDataError
 * @property {string} user
 */

/**
 * @typedef UserBioData
 * @property {string} aboutMe
 * @property {string} website
 * @property {string} location
 * @property {string} userImage
 */

/**
 * @typedef UserData
 * @property {Date} createdAt
 * @property {string} userHandle
 * @property {UserCredentialData} credential
 * @property {UserBioData} bio
 * @property {LikeListData} like
 */

/**
 * @typedef RegistrationData
 * @property {string} email
 * @property {string} userHandle
 * @property {string} password
 * @property {string} confirmPassword
 */

/**
 * @typedef UserBioData
 * @property {string} bio
 * @property {string} website
 * @property {string} location
 */

/**
 * @typedef NewUserData
 * @property {string} _id
 * @property {string} email
 * @property {string} userHandle
 * @property {string} password
 * @property {Date} createdAt
 */

/**
 * @typedef PostData
 * @property {string} postId
 * @property {string} body
 * @property {string} userHandle
 * @property {string} userImage
 * @property {Date} createdAt
 * @property {number} likeCount
 * @property {number} commentCount
 */

/**
 * @typedef PostDataError
 * @property {string} post
 */

/**
 * @typedef LikeListData
 * @property {LikeData} like
 */

/**
 * @typedef LikeData
 * @property {string} userHandle
 * @property {string} postId
 */

/**
 * @typedef NotificationData
 * @property {boolean} read
 * @property {string} recipient
 * @property {string} postId
 * @property {string} sender
 * @property {string} type
 * @property {string} typeId
 */

/**
 * @typedef NotificationDataError
 * @property {string} notification
 */

/**
 * @typedef NewCommentData
 * @property {string} userHandle
 * @property {string} postId
 * @property {string} userImage
 * @property {string} body
 * @property {Date} createdAt
 */

/**
 * @typedef CommentData
 * @property {string} userHandle
 * @property {string} postId
 * @property {string} body
 * @property {Date} createAt
 */

/**
 * @typedef CommentDataError
 * @property {string} comment
 */

/**
 * @typedef UserDataError
 * @property {string} email
 * @property {string} password
 * @property {string} userHandle
 */

/**
 * @typedef TokenData
 * @property {string} token
 */

/**
 * @typedef {[T?,React.Dispatch<T?>]} UseStateResult<T>
 * @template T
 */
