import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';

import * as fetchUtil from '../../util/fetch';

// Context
import { useCurrentUserData } from '../profile/currentUserContext';

/** @type {React.Context<LikeContextProps>} */
const likeContext = createContext();

/**
 * @typedef LikeContextProps
 * @property {Error} likeError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setLikeError
 * @property {Date} lastRefreshLikeList
 * @property {React.Dispatch<React.SetStateAction<Date>>} setLastRefreshLikeList
 * @property {_.Dictionary<Like>} likeList
 * @property {React.Dispatch<React.SetStateAction<_.Dictionary<Like>>>} setLikeList
 * @property {boolean} isLoadingLikeList
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingLikeList
 * @property {boolean} isLoadingLikePost
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingLikePost
 * @property {boolean} isLoadingUnlikePost
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingUnlikePost
 * @property {()=>void} refreshLikeList
 * @property {(postId:string)=>void} likePost
 * @property {(postId:string)=>void} unlikePost
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @returns {React.FunctionComponent}
 */
export const LikeProvider = ({ children }) => {
  const [likeError, setLikeError] = useState();
  const [lastRefreshLikeList, setLastRefreshLikeList] = useState();
  /** @type {UseStateResult<_.Dictionary<Like>>} */
  const [likeList, setLikeList] = useState();
  const [isLoadingLikeList, setIsLoadingLikeList] = useState(false);
  const [isLoadingLikePost, setIsLoadingLikePost] = useState(false);
  const [isLoadingUnlikePost, setIsLoadingUnlikePost] = useState(false);

  /** Attempts to retrieve a new like list
   *
   * @returns {void|Error}
   */
  const refreshLikeList = async () => {
    if (!isLoadingLikeList) {
      setIsLoadingLikeList(true);
      setLastRefreshLikeList(Date.now());
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
          setIsLoadingLikeList(false);
          return;
        });
    }
  };

  /** Attempts to like a post
   *
   * @param {string} postId
   * @returns {void|Error}
   */
  const likePost = async postId => {
    if ((postId, !isLoadingLikePost)) {
      setIsLoadingLikePost(true);
      await fetchUtil.post
        .likePost(postId)
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

  /** Attempts to unlike a post
   *
   * @param {string} postId
   * @returns {void|Error}
   */
  const unlikePost = async postId => {
    if (postId && !isLoadingUnlikePost) {
      setIsLoadingUnlikePost(true);
      await fetchUtil.post
        .unlikePost(postId)
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

/**
 * @typedef UseLikeDataResult
 * @property {Like[]} likeList
 * @property {Error} likeError
 * @property {boolean} isLoadingLikeList
 * @property {(postId:string)=>void} likePost
 * @property {(postId:string)=>void} unlikePost
 * @property {()=>void} refreshLikeList
 */

/** A hook for consuming our Like context in a safe way
 *
 * @example //getting the like list
 * import { useLikeData } from 'likeContext'
 * const { likeList } = useLikeData();
 * @returns {UseLikeDataResult}
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
    (!likeList ||
      !lastRefreshLikeList ||
      lastRefreshLikeList + 600000 <= Date.now())
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
