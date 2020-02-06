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
 */
export const LikeProvider = ({ children }) => {
  const [likeError, setLikeError] = useState();
  const [lastRefreshLikeList, setlastRefreshLikeList] = useState();
  /** @type {UseStateResult<_.Dictionary<Like>>} */
  const [likeList, setLikeList] = useState();
  const [isLoadingLikeList, setIsLoadingLikeList] = useState(false);
  const [isLoadingLikePost, setIsLoadingLikePost] = useState(false);
  const [isLoadingUnlikePost, setIsLoadingUnlikePost] = useState(false);

  const refreshLikeList = async () => {
    if (!isLoadingLikeList) {
      setIsLoadingLikeList(true);
      // Fetch list of likes
      await fetchUtil.user
        .fetchLikeList(localStorage?.Handle)
        .then(res => {
          setLikeList(_.keyBy(res.data, 'postId'));
        })
        .catch(err => {
          setLikeError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setlastRefreshLikeList(Date.now);
          setIsLoadingLikeList(false);
          return;
        });
    }
  };

  const likePost = async (postId, likeId) => {
    if ((postId, !isLoadingLikePost)) {
      setIsLoadingLikePost(true);
      await fetchUtil.post
        .likePost(postId, likeId)
        .then(async success => {
          if (success) {
            await refreshLikeList();
          }
        })
        .catch(err => {
          setLikeError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingLikePost(false);
          return;
        });
    }
  };

  const unlikePost = async (postId, likeId) => {
    if (postId && !isLoadingUnlikePost) {
      setIsLoadingUnlikePost(true);
      await fetchUtil.post
        .unlikePost(postId, likeId)
        .then(async success => {
          if (success) {
            await refreshLikeList();
          }
        })
        .catch(err => {
          setLikeError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingUnlikePost(false);
          return;
        });
    }
  };

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
export const useLikeData = () => {
  // Destructuring value from provider
  const ctx = useContext(likeContext);

  if (ctx === undefined) {
    throw new Error('useLikeData must be used within a LikeProvider');
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
    (!lastRefreshLikeList || lastRefreshLikeList + 600 <= Date.now)
  ) {
    refreshLikeList();
  }

  // What we want this consumer hook to actually return
  return {
    likeList,
    likeError,
    isLoadingLikeList,
    likePost,
    unlikePost,
    refreshLikeList,
  };
};

/**
 * @typedef Like
 * @property {string} postId
 * @property {string} userHandle
 */
