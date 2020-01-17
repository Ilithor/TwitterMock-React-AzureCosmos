import { get, post } from './fetch';

export const endpoints = {
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
};

/** Attempts to log the user in
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const loginUser = userData => post(endpoints.login, userData);
/** Attempts to register the user
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const registerUser = userData => post(endpoints.register, userData);

/** Retrieves user data using handle
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const getUserData = handle => get(endpoints.userData + `/${handle}`);

/** Retrieves likes made by user
 * @returns {Promise<import("axios").AxiosResponse}
 */
export const getLikeList = handle =>
  get(endpoints.userData + `/${handle}/like`);

/** Attempts to upload user image
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const uploadImage = formData => post(endpoints.uploadImage, formData);

/** Attempts to update user details
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const editUserDetail = userDetail =>
  post(endpoints.editUserDetail, userDetail);

/**
 * @typedef {import('./fetch').Endpoint} Endpoint
 */
