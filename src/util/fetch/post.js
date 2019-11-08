import { get, post } from './fetch';

export const endpoints = {
  /** @type {Endpoint} */
  post: 'api/post',
};

/** Fetch the current list of top posts
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPostList = () => get(endpoints.post);

/**
 * @typedef {import('./fetch').Endpoint} Endpoint
 */
export const createPost = () => post(endpoints.post);
