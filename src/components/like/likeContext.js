import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';

/** @type {React.Context<{likeList:Like[],likeError:Error,refreshLikeList:()=>void}} */
const likeContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @param {()=>Promise<import('axios').AxiosResponse<Like[]>>} props.fetchLikeList
 */
export const LikeProvider = ({ children, fetchLikeList }) => {
  const [likeError, setLikeError] = useState();
  /** @type {UseStateResult<_.Dictionary<Like>>} */
  const [likeList, setLikeList] = useState({});
  const [isLoadingLikeList, setIsLoadingLikeList] = useState(true);

  const refreshLikeList = userHandle =>
    new Promise((resolve, reject) => {
      setIsLoadingLikeList(true);
      // Fetch list of likes
      fetchLikeList(userHandle)
        .then(res => {
          setLikeList(_.keyBy(res.data, 'postId'));
          resolve(likeList);
        })
        .catch(err => {
          setLikeError(err);
          reject(err);
        })
        .finally(() => {
          setIsLoadingLikeList(false);
        });
    });

  // Passing state to value to be passed to provider
  const value = {
    likeError,
    likeList,
    refreshLikeList,
    isLoadingLikeList,
    setIsLoadingLikeList,
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

  const { likeList, likeError, refreshLikeList, isLoadingLikeList } = ctx;
  if (!likeError && _.keys(likeList)?.length === 0 && !!userHandle) {
    refreshLikeList(userHandle);
  }

  // What we want this consumer hook to actually return
  return { likeList, likeError, isLoadingLikeList, refreshLikeList };
};

/**
 * @typedef Like
 * @property {string} postId
 * @property {string} userHandle
 */
