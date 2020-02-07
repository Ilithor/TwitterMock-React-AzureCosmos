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

  /** Refreshes the post list
   *
   * @returns {void | Error}
   */
  const refreshPostList = async () => {
    if (!isLoadingPostList) {
      setIsLoadingPostList(true);
      // Fetch list of posts
      await fetchUtil.post
        .fetchPostList()
        .then(res => {
          if (res?.data) {
            setPostList(_.keyBy(res.data, 'postId'));
          }
        })
        .catch(err => {
          setPostError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setLastRefreshPostList(Date.now);
          setIsLoadingPostList(false);
          return Promise.resolve();
        });
    }
  };

  /** Creates a new post with the provided user info
   *
   * @param {object} postParam
   * @returns {void | Error}
   */
  const newPost = async postParam => {
    if (postParam && !isLoadingNewPost) {
      setIsLoadingNewPost(true);
      await fetchUtil.post
        .createPost(postParam)
        .then(async success => {
          if (success) {
            await refreshPostList();
          }
        })
        .catch(err => {
          setPostError(err);
          Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingNewPost(false);
          return;
        });
    }
  };

  /** Deletes post with the provided postId
   *
   * @param {string} postId
   * @returns {void | Error}
   */
  const deletePost = async postId => {
    if (postId && !isLoadingDeletePost) {
      setIsLoadingDeletePost(true);
      await fetchUtil.post
        .deletePost(postId)
        .then(async () => {
          await refreshPostList();
        })
        .catch(err => {
          setPostError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingDeletePost(false);
          return Promise.resolve();
        });
    }
  };

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

/** @typedef UsePostDataResult
 * @property {_.Dictionary<Post>} postList
 * @property {Error} [postError]
 * @property {boolean} isLoadingPostList
 * @property {boolean} isLoadingNewPost
 * @property {(id:string)=>void} deletePost
 * @property {(data:{body:string})=>void} newPost
 * @property {()=>void} refreshPostList
 */

/** A hook for consuming our Notification context in a safe way
 *
 * @example //getting the post list
 * import { usePostData } from 'postContext'
 * const { postList } = usePostData();
 * @returns {UsePostDataResult}
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
    refreshPostList,
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
