import { get, post, remove } from './fetch';

export const endpoints = {
  /** @type {Endpoint} */
  post: 'api/post/',
};

/** Fetch the current list of top posts
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPostList = () => get(endpoints.post);

/** Fetch a specific post
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPost = postId => get(endpoints.post + postId);

/** Creates a new post
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const createPost = newPost => post(endpoints.post, newPost);

/** Likes a post
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const likePost = postId => get(endpoints.post + postId + '/like');

/** Unlikes a post
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const unlikePost = postId => get(endpoints.post + postId + '/unlike');

/** Comment on post
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const commentPost = (postId, commentData) =>
  post(endpoints.post + postId + '/comment', commentData);

/** Deletes a post
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const deletePost = postId => remove(endpoints.post + postId);
