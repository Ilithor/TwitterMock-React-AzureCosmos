import axios from 'axios';
import { getUserBearerToken } from '../../auth';

const defaultHeaders = {
  authorization: `Bearer ${getUserBearerToken()}`,
};
/** @type {import('axios').AxiosRequestConfig} */
const defaultConfig = { headers: defaultHeaders };

/** Called when a request fails
 * @param {Error} error
 */
const onRequestFail = error => console.log(error);

/** Fetch an arbitrary endpoint
 * @param {Endpoint} endpoint
 */
export const get = endpoint =>
  new Promise((resolve, reject) => {
    axios
      .get(endpoint, defaultConfig)
      .then(resolve)
      .catch(error => {
        onRequestFail(error);
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
      .post(endpoint, data, defaultConfig)
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
