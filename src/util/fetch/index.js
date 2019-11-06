import { get, post } from './fetch';

export const endpoints = {
         /** @type {Endpoint} */
         post: 'api/post',
         /** @type {Endpoint} */
         login: 'api/user/login',
         /** @type {Endpoint} */
         register: 'api/user/register',
         /** @type {Endpoint} */
         userData: 'api/user',
       };

/** Fetch the current list of top posts
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPostList = () => get(endpoints.post);
export const loginUser = userData => post(endpoints.login, userData);
export const registerUser = userData => post(endpoints.register, userData);

/** Retrieves user data using handle
 * @param {string} handle
 */
export const getUserData = handle => {
  return get(endpoint.userData + `/${handle}`);
};

/**
 * @typedef Endpoint
 */