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
 * @param {String} postId
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPost = postId => get(`${endpoints.post}${postId}`);

/**
 * Creates a new post
 *
 * @param {Object} newPost
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const createPost = newPost => post(endpoints.post, newPost);

/**
 * Likes a post
 *
 * @param {String} postId
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const likePost = postId => get(`${endpoints.post}${postId}/like`);

/**
 * Unlikes a post
 *
 * @param {String} postId
 * @returns {Promise<import("axios").AxiosResponse>}
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
 * @param {String} postId
 * @param {Object} commentData
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const commentOnPost = (postId, commentData) =>
  post(`${endpoints.post}${postId}/comment`, commentData);

/**
 * Deletes a comment
 *
 * @param {String} postId
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const deleteComment = postId =>
  remove(`${endpoints.post}${postId}/uncomment`);

/**
 * Deletes a post
 *
 * @param {String} postId
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const deletePost = postId => remove(`${endpoints.post}${postId}`);
