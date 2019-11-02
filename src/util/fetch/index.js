import { get, post, endpoints } from "./fetch";

/** Fetch the current list of top posts
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPostList = () => get(endpoints.post);
export const loginUser = userData => post(endpoints.login, userData);