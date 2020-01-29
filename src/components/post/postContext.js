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
  const [postList, setPostList] = useState();
  const [isLoadingPostList, setIsLoadingPostList] = useState(false);
  const [isLoadingNewPost, setIsLoadingNewPost] = useState(false);
  const [isLoadingDeletePost, setIsLoadingDeletePost] = useState(false);

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

  const newPost = postParam =>
    new Promise((resolve, reject) => {
      if (postParam && !isLoadingNewPost) {
        setIsLoadingNewPost(true);
        fetchUtil.post
          .newPost(postParam)
          .then(res => {
            refreshPostList();
            resolve(postList);
          })
          .catch(err => {
            setPostError(err);
            reject(err);
          })
          .finally(() => setIsLoadingNewPost(false));
      }
    });

  const deletePost = postId =>
    new Promise((resolve, reject) => {
      if (postId && !isLoadingDeletePost) {
        setIsLoadingDeletePost(true);
        fetchUtil.post
          .deletePost(postId)
          .then(() => {
            refreshPostList().then(() => resolve(postList));
          })
          .catch(err => {
            setPostError(err);
            reject(err);
          })
          .finally(() => setIsLoadingDeletePost(false));
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
    deletePost,
    newPost,
    isLoadingNewPost,
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
    deletePost,
    newPost,
    isLoadingNewPost,
  } = ctx;

  if (
    !isLoadingPostList &&
    (!lastRefreshPostList || lastRefreshPostList + 600 <= Date.now)
  ) {
    refreshPostList();
  }

  // What we want this consumer hook to actually return
  return {
    postList,
    postError,
    isLoadingPostList,
    deletePost,
    newPost,
    isLoadingNewPost,
  };
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
