import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';

/** @type {React.Context<{commentList:Comment[],commentError:Error,getData:()=>void}} */
const commentContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @param {()=>Promise<import('axios').AxiosResponse<Comment[]>>} props.fetchCommentList
 */
export const CommentProvider = ({ children, fetchCommentList }) => {
  /** @type {Comment[]} */
  const defaultState = [];
  const [commentError, setCommentError] = useState();
  const [commentList, setCommentList] = useState(defaultState);

  const getData = () => {
    // Fetch list of comments
    fetchCommentList()
      .then(res => {
        setCommentList(_.keyBy(res?.data, '_id'));
      })
      .catch(err => setCommentError(err));
  };

  // Passing state to value to be passed to provider
  const value = {
    commentError,
    commentList,
    getData,
  };
  return (
    <commentContext.Provider value={value}>{children}</commentContext.Provider>
  );
};

/** A hook for consuming our Comment context in a safe way
 *
 * @example //getting the comment list
 * import { useCommentData } from 'commentContext'
 * const { commentList } = useCommentData();
 * @returns {Comment[]}
 */
export const useCommentData = () => {
  // Destructuring value from provider
  const ctx = useContext(commentContext);

  if (ctx === undefined) {
    throw new Error('useCommentData must be used within a CommentProvider');
  }
  const { commentList, commentError, getData } = ctx;
  if (!commentError && _.keys(commentList)?.length === 0) {
    getData();
  }

  // What we want this consumer hook to actually return
  return { commentList, commentError };
};

/**
 * @typedef Comment
 * @property {string} _id
 * @property {string} userHandle
 * @property {string} postId
 * @property {string} body
 * @property {Date} createdAt
 */