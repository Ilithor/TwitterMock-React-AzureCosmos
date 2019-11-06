import axios from 'axios';

/** Fetch an arbitrary endpoint
 * @param {Endpoint} endpoint
 */
export const get = endpoint =>
  new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then(resolve)
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

/** Fetch endpoint and post given data
 * @param {Endpoint} endpoint
 * @param {Object} data
 */
export const post = (endpoint, data) =>
  new Promise((resolve, reject) => {
    axios
      .post(endpoint, data)
      .then(resolve)
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

/**
 * @typedef Endpoint
 * @extends {string}
 */