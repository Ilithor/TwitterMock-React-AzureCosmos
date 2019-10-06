/**
 * @typedef {(req:Request, res:Response, next:()=>void)} RouteHandler
 */

/**
 * @typedef User
 * @implements {UserBio}
 * @property {string} _id
 * @property {string} email
 * @property {string} password
 * @property {string} handle
 * @property {Date} createdAt
 * @property {string} bio
 * @property {string} website
 * @property {string} location
 * @property {string} image
 */

/**
 * @typedef UserRegistration
 * @property {string} email
 * @property {string} handle
 * @property {string} password
 * @property {string} confirmPassword
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
 * @typedef UserLogin
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef UserBio
 * @property {string} bio
 * @property {string} website
 * @property {string} location
 */

/**
 * @typedef Post
 */

 /**
  * @typedef UserError
  * @property {string} email
  * @property {string} password
  * @property {string} handle
  */