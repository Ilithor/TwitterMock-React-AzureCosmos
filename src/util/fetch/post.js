import { get, post } from './fetch';

export const endpoints = {
  /** @type {Endpoint} */
  post: 'api/post/',
};

/** Fetch the current list of top posts
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPostList = () => get(endpoints.post);

/** Creates a new post
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const createPost = () => post(endpoints.post);

/** Likes a post
 * @returns {Promise<import("axios").AxiosResponse>} 
 */
export const likePost = postId => get(endpoints.post + postId + '/like');

/** Unlikes a post
 * @returns {Promise<import("axios").AxiosResponse>} 
 */
export const unlikePost = postId => get(endpoints.post + postId + '/unlike');
