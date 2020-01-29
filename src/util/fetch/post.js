import { get, post, remove } from './fetch';

export const endpoints = {
  /** @type {Endpoint} */
  post: 'api/post/',
};

/**
 * Fetch the current list of top posts
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPostList = () => get(endpoints.post);

/**
 * Fetch a specific post
 *
 * @param postId
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPost = postId => get(`${endpoints.post}${postId}`);

/**
 * Creates a new post
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 * @param newPost
 */
export const createPost = newPost => post(endpoints.post, newPost);

/**
 * Likes a post
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 * @param postId
 */
export const likePost = postId => get(`${endpoints.post}${postId}/like`);

/**
 * Unlikes a post
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 * @param postId
 */
export const unlikePost = postId => get(`${endpoints.post}${postId}/unlike`);

/**
 * Retrieves all comments
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchCommentList = () => get(`${endpoints.post}comment`);

/**
 * Comment on post
 *
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const commentOnPost = (postId, commentData) =>
  post(`${endpoints.post}${postId}/comment`, commentData);

/**
 * Deletes a post
 *
 * @param postId
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const deletePost = postId => remove(`${endpoints.post}${postId}`);
