import { get, post, endpoints, getWithHandle } from './fetch';

/** Fetch the current list of top posts
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPostList = () => get(endpoints.post);
export const loginUser = userData => post(endpoints.login, userData);
export const registerUser = userData => post(endpoints.register, userData);
export const fetchUserData = handle => getWithHandle(endpoints.userData, handle);
