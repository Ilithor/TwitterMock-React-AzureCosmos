/**
 * @typedef {(req:Request, res:Response, next:()=>void)} RouteHandler
 */

/**
 * @typedef UserCredential
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef UserCredentialError
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef UserNotFound
 * @property {string} user
 */

/**
 * @typedef UserBio
 * @property {string} aboutMe
 * @property {string} website
 * @property {string} location
 * @property {string} userImage
 */

/**
 * @typedef User
 * @property {Date} createdAt
 * @property {string} userHandle
 * @property {UserCredential} credential
 * @property {UserBio} bio
 * @property {LikeList} like
 */

/**
 * @typedef UserRegistration
 * @property {string} email
 * @property {string} userHandle
 * @property {string} password
 * @property {string} confirmPassword
 */

/**
 * @typedef UserBioUpdate
 * @property {string} bio
 * @property {string} website
 * @property {string} location
 */

/**
 * @typedef UserNew
 * @property {string} _id
 * @property {string} email
 * @property {string} userHandle
 * @property {string} password
 * @property {Date} createdAt
 */

/**
 * @typedef Post
 * @property {string} postId
 * @property {string} body
 * @property {string} userHandle
 * @property {string} userImage
 * @property {Date} createdAt
 * @property {number} likeCount
 * @property {number} commentCount
 */

/**
 * @typedef PostError
 * @property {string} body
 */

/**
 * @typedef PostNotFound
 * @property {string} post
 */

/**
 * @typedef LikeList
 * @property {Like} like
 */

/**
 * @typedef Like
 * @property {string} userHandle
 * @property {string} postId
 */

/**
 * @typedef UserNotification
 * @property {boolean} read
 * @property {string} recipient
 * @property {string} postId
 * @property {string} sender
 * @property {string} type
 * @property {string} typeId
 */

/**
 * @typedef NotificationNotFound
 * @property {string} notification
 */

/**
 * @typedef NewUserComment
 * @property {string} userHandle
 * @property {string} postId
 * @property {string} userImage
 * @property {string} body
 * @property {Date} createdAt
 */

/**
 * @typedef UserComment
 * @property {string} userHandle
 * @property {string} postId
 * @property {string} body
 * @property {Date} createAt
 */

/**
 * @typedef UserCommentError
 * @property {string} comment
 */

/**
 * @typedef UserError
 * @property {string} email
 * @property {string} password
 * @property {string} userHandle
 */

/**
 * @typedef Token
 * @property {string} token
 */

/**
 * @typedef {[T?,React.Dispatch<T?>]} UseStateResult<T>
 * @template T
 */
