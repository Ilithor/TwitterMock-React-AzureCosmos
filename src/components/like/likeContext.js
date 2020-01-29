import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';

import * as fetchUtil from '../../util/fetch';

/** @type {React.Context<{likeList:Like[],likeError:Error,refreshLikeList:()=>void}} */
const likeContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @param {()=>Promise<import('axios').AxiosResponse<Like[]>>} props.fetchLikeList
 */
export const LikeProvider = ({ children }) => {
  const [likeError, setLikeError] = useState();
  const [lastRefreshLikeList, setlastRefreshLikeList] = useState();
  /** @type {UseStateResult<_.Dictionary<Like>>} */
  const [likeList, setLikeList] = useState({});
  const [isLoadingLikeList, setIsLoadingLikeList] = useState(false);
  const [isLoadingLikePost, setIsLoadingLikePost] = useState(false);
  const [isLoadingUnlikePost, setIsLoadingUnlikePost] = useState(false);

  const refreshLikeList = userHandle =>
    new Promise((resolve, reject) => {
      setIsLoadingLikeList(true);
      // Fetch list of likes
      fetchUtil.user
        .fetchLikeList(userHandle)
        .then(res => {
          setLikeList(_.keyBy(res.data, 'postId'));
          resolve(likeList);
        })
        .catch(err => {
          setLikeError(err);
          reject(err);
        })
        .finally(() => {
          setlastRefreshLikeList(Date.now);
          setIsLoadingLikeList(false);
        });
    });

  const likePost = postId =>
    new Promise((resolve, reject) => {
      if ((postId, !isLoadingLikePost)) {
        setIsLoadingLikePost(true);
        fetchUtil.post
          .likePost(postId)
          .then(async () => {
            resolve(likeList);
          })
          .catch(err => {
            setLikeError(err);
            reject(err);
          })
          .finally(() => setIsLoadingLikePost(false));
      }
    });

  const unlikePost = postId =>
    new Promise((resolve, reject) => {
      if (postId && !isLoadingUnlikePost) {
        setIsLoadingUnlikePost(true);
        fetchUtil.post
          .unlikePost(postId)
          .then(async () => {
            resolve(likeList);
          })
          .catch(err => {
            setLikeError(err);
            reject(err);
          })
          .finally(() => setIsLoadingUnlikePost(false));
      }
    });

  // Passing state to value to be passed to provider
  const value = {
    likeError,
    likeList,
    refreshLikeList,
    isLoadingLikeList,
    lastRefreshLikeList,
    likePost,
    unlikePost,
  };
  return <likeContext.Provider value={value}>{children}</likeContext.Provider>;
};

/** A hook for consuming our Like context in a safe way
 *
 * @example //getting the like list
 * import { useLikeData } from 'likeContext'
 * const { likeList } = useLikeData();
 * @returns {Like[]}
 */
export const useLikeData = userHandle => {
  // Destructuring value from provider
  const ctx = useContext(likeContext);

  if (ctx === undefined) {
    throw new Error('useLikeData must be used within a Like Provider');
  }

  const {
    likeList,
    likeError,
    refreshLikeList,
    isLoadingLikeList,
    lastRefreshLikeList,
    likePost,
    unlikePost,
  } = ctx;

  if (
    !isLoadingLikeList &&
    (_.keys(likeList).length === 0 ||
      lastRefreshLikeList === null ||
      lastRefreshLikeList >= Date.now + 600)
  ) {
    refreshLikeList();
  }

  // What we want this consumer hook to actually return
  return { likeList, likeError, isLoadingLikeList, likePost, unlikePost };
};

/**
 * @typedef Like
 * @property {string} postId
 * @property {string} userHandle
 */
