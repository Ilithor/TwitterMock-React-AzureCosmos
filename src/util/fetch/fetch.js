import axios from "axios";

export const endpoints = {
  /** @type {Endpoint} */
  post: "api/post"
};

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

/**
 * @typedef {string} Endpoint
 */
