import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';

/** @type {React.Context<{postList:Post[],postError:Error,getData:()=>void}} */
const postContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @param {()=>Promise<import('axios').AxiosResponse<Post[]>>} props.fetchPostList
 */
export const PostProvider = ({ children, fetchPostList }) => {
  const [postError, setPostError] = useState();
  /** @type {UseStateResult<_.Dictionary<Post>>} */
  const [postList, setPostList] = useState({});

  const getData = () => {
    // Fetch list of posts
    fetchPostList().then(res => {
      setPostList(_.keyBy(res.data, 'postId'));
    });
  };

  // Passing state to value to be passed to provider
  const value = {
    postError,
    postList,
    getData,
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

  const { postList, postError, getData } = ctx;
  if (!postError && _.keys(postList)?.length === 0) {
    getData();
  }

  // What we want this consumer hook to actually return
  return { postList, postError };
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