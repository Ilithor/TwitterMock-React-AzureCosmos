import { get, post } from './fetch';

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
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const loginUser = userData => post(endpoints.login, userData);
/** Attempts to register the user
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const registerUser = userData => post(endpoints.register, userData);

/** Retrieves user data using handle
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchUserData = handle => get(endpoints.userData + `/${handle}`);

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
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const markNotificationRead = notificationId =>
  (notificationId && post(endpoints.notification, { notificationId })) ||
  Promise.reject('notificationId was not defined');

/** Attempts to upload user image
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const uploadImage = formData => post(endpoints.uploadImage, formData);

/** Attempts to update user details
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const editUserDetail = userDetail =>
  post(endpoints.editUserDetail, userDetail);

/**
 * @typedef {import('./fetch').Endpoint} Endpoint
 */
