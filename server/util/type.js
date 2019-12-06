/**
 * @typedef {(req:Request, res:Response, next:()=>void)} RouteHandler
 */

/**
 * @typedef UserCredential
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef UserBio
 * @property {string} bio
 * @property {string} website
 * @property {string} location
 * @property {string} Image
 */

/**
 * @typedef User
 * @property {Date} createdAt
 * @property {string} handle
 * @property {UserCredential} credential
 * @property {UserBio} bio
 * @property {LikeList} like
 */

/**
 * @typedef UserRegistration
 * @property {string} email
 * @property {string} handle
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
 * @property {string} handle
 * @property {string} password
 * @property {Date} createdAt
 */

/**
 * @typedef Post
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
 * @typedef UserError
 * @property {string} email
 * @property {string} password
 * @property {string} handle
 */
