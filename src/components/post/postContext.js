import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';

import * as fetchUtil from '../../util/fetch';
import { useQueryGate } from '../../util/queryGate';

/** @type {React.Context<PostContextProps>} */
const postContext = createContext();

/**
 * @typedef PostContextProps
 * @property {Error} postError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setPostError
 * @property {Date} lastRefreshPostList
 * @property {React.Dispatch<React.SetStateAction<Date>>} setLastRefreshPostList
 * @property {_.Dictionary<Post>} postList
 * @property {React.Dispatch<React.SetStateAction<_.Dictionary<Post>>>} setPostList
 * @property {boolean} isLoadingPostList
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingPostList
 * @property {boolean} isLoadingNewPost
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingNewPost
 * @property {boolean} isLoadingDeletePost
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingDeletePost
 * @property {()=>void} refreshPostList
 * @property {(postParam:{body:string})=>void} newPost
 * @property {(postId:string)=>void} deletePost
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @param {()=>Promise<import('axios').AxiosResponse<Post[]>>} props.fetchPostList
 * @returns {React.FunctionComponent}
 */
export const PostProvider = ({ children }) => {
  const [postError, setPostError] = useState();
  const [lastRefreshPostList, setLastRefreshPostList] = useState();
  /** @type {UseStateResult<_.Dictionary<Post>>} */
  const [postList, setPostList] = useState();
  const [isLoadingPostList, setIsLoadingPostList] = useState(false);
  const [isLoadingNewPost, setIsLoadingNewPost] = useState(false);
  const [isLoadingDeletePost, setIsLoadingDeletePost] = useState(false);
  const gate = useQueryGate();

  /** Refreshes the post list
   *
   * @returns {Promise}
   */
  const refreshPostList = async () => {
    if (await gate.allowQuery(refreshPostList.name)) {
      if (!isLoadingPostList) {
        setIsLoadingPostList(true);
        setLastRefreshPostList(Date.now());
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
          .finally(() => setIsLoadingPostList(false));
      }
    }
  };

  /** Creates a new post with the provided user info
   *
   * @param {{body:string}} postParam
   * @returns {Promise}
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
        .finally(() => setIsLoadingNewPost(false));
    }
  };

  /** Deletes post with the provided postId
   *
   * @param {string} postId
   * @returns {Promise}
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
        .finally(() => setIsLoadingDeletePost(false));
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

/**
 * @typedef UsePostDataResult
 * @property {_.Dictionary<Post>} postList
 * @property {Error} [postError]
 * @property {boolean} isLoadingPostList
 * @property {boolean} isLoadingNewPost
 * @property {(postId:string)=>void} deletePost
 * @property {(postParam:{body:string})=>void} newPost
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
    (!postList ||
      !lastRefreshPostList ||
      lastRefreshPostList + 600000 <= Date.now())
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
