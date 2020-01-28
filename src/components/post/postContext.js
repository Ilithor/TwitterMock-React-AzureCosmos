import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';

import * as fetchUtil from '../../util/fetch';

/** @type {React.Context<{postList:Post[],postError:Error,refreshPostList:()=>void}} */
const postContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @param {()=>Promise<import('axios').AxiosResponse<Post[]>>} props.fetchPostList
 */
export const PostProvider = ({ children }) => {
  const [postError, setPostError] = useState();
  const [lastRefreshPostList, setLastRefreshPostList] = useState();
  /** @type {UseStateResult<_.Dictionary<Post>>} */
  const [postList, setPostList] = useState({});
  const [isLoadingPostList, setIsLoadingPostList] = useState(false);

  const refreshPostList = () =>
    new Promise((resolve, reject) => {
      if (!isLoadingPostList) {
        setIsLoadingPostList(true);
        // Fetch list of posts
        fetchUtil.post
          .fetchPostList()
          .then(res => {
            setPostList(_.keyBy(res.data, 'postId'));
            resolve(postList);
          })
          .catch(err => {
            setPostError(err);
            reject(err);
          })
          .finally(() => {
            setLastRefreshPostList(Date.now);
            setIsLoadingPostList(false);
          });
      }
    });

  // Passing state to value to be passed to provider
  const value = {
    postError,
    postList,
    refreshPostList,
    isLoadingPostList,
    setIsLoadingPostList,
    lastRefreshPostList,
  };
  return <postContext.Provider value={value}>{children}</postContext.Provider>;
};

/** A hook for consuming our Notification context in a safe way
 *
 * @example //getting the post list
 * import { usePostData } from 'postContext'
 * const { postList } = usePostData();
 * @returns {Post[]}
 */
export const usePostData = () => {
  // Destructuring value from provider
  const ctx = useContext(postContext);

  if (ctx === undefined) {
    throw new Error('usePostData must be used within a PostProvider');
  }

  const {
    postList,
    postError,
    refreshPostList,
    isLoadingPostList,
    lastRefreshPostList,
  } = ctx;

  if (
    !isLoadingPostList &&
    (_.keys(postList).length === 0 ||
      lastRefreshPostList === null ||
      lastRefreshPostList >= Date.now + 600)
  ) {
    refreshPostList();
  }

  // What we want this consumer hook to actually return
  return { postList, postError, isLoadingPostList };
};

/**
 * @typedef Post
 * @property {string} postId
 * @property {string} body
 * @property {string} userHandle
 * @property {Date} createdAt
 * @property {number} commentCount
 * @property {number} likeCount
 * @property {string} userImage
 */
