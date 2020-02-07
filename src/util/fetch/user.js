import { get, post, remove } from './fetch';

export const endpoints = {
  /** @type {Endpoint} */
  userList: 'api/user/list',
  /** @type {Endpoint} */
  login: 'api/user/login',
  /** @type {Endpoint} */
  register: 'api/user/register',
  /** @type {Endpoint} */
  userData: 'api/user',
  /** @type {Endpoint} */
  uploadImage: 'api/user/image',
  /** @type {Endpoint} */
  editUserDetail: 'api/user',
  /** @type {Endpoint} */
  notification: 'api/user/notification',
};

/** Attempts to retrieve list of users
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchUserList = () => get(endpoints.userList);

/** Attempts to log the user in
 *
 * @param {object} userData
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const loginUser = userData => post(endpoints.login, userData);
/** Attempts to register the user
 *
 * @param {object} userData
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const registerUser = userData => post(endpoints.register, userData);

/** Retrieves user data using userHandle
 *
 * @param {string} userHandle
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchUserData = userHandle =>
  get(endpoints.userData + `/${userHandle}`);

/** Retrieves likes made by user
 *
 * @returns {Promise<import("axios").AxiosResponse}
 */
export const fetchLikeList = () => get(endpoints.userData + `/like`);

/** Retrives notifcations for user
 *
 * @returns {Promise<import("axios").AxiosResponse}
 */
export const fetchNotificationList = () => get(endpoints.notification);

/** Attempts to mark a notification as read
 *
 * @param {string} notificationId
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const markNotificationRead = notificationId =>
  (notificationId && post(endpoints.notification, { notificationId })) ||
  Promise.reject('notificationId was not defined');

/** Attempts to upload userImage
 *
 * @param {object} formData
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const uploadImage = formData => post(endpoints.uploadImage, formData);

/** Attempts to update user details
 *
 * @param {object} userDetail
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const editUserDetail = userDetail =>
  post(endpoints.editUserDetail, userDetail);

/** Attempts to delete the user
 *
 * @param {string} userHandle
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const deleteUser = userHandle =>
  remove(`${endpoints.userData}/${userHandle}`);

/**
 * @typedef {import('./fetch').Endpoint} Endpoint
 */
