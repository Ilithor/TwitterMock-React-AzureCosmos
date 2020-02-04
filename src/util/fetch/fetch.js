import axios from 'axios';

/** Called when a request fails
 * 
 * @param {Error} error
 */
const onRequestFail = error => console.log(error);

/** Fetch an arbitrary endpoint
 * 
 * @param {Endpoint} endpoint
 */
export const get = endpoint =>
  new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then(resolve)
      .catch(error => {
        onRequestFail(error);
        reject(error);
      });
  });

/** Fetch endpoint and post given data
 * 
 * @param {Endpoint} endpoint
 * @param {object} data
 */
export const post = (endpoint, data) =>
  new Promise((resolve, reject) => {
    axios
      .post(endpoint, data)
      .then(resolve)
      .catch(error => {
        onRequestFail(error);
        reject(error);
      });
  });

/** Fetch endpoint and delete post
 * 
 * @param {Endpoint} endpoint
 */
export const remove = endpoint =>
  new Promise((resolve, reject) => {
    axios
      .delete(endpoint)
      .then(resolve)
      .catch(error => {
        onRequestFail(error);
        reject(error);
      });
  });

/**
 * @typedef Endpoint
 * @extends {string}
 */
