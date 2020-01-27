import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';
import { commentPost } from '../../util/fetch/post';

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
  const [isLoadingCommentOnPost, setIsLoadingCommentOnPost] = useState(false);
  const getCommentListData = () => {
    // Fetch list of comments
    fetchCommentList()
      .then(res => {
        setCommentList(_.keyBy(res?.data, '_id'));
      })
      .catch(err => setCommentError(err));
  };

  const commentOnPost = (postId, commentParams) => {
    setIsLoadingCommentOnPost(true);
    commentPost(postId, commentParams).then(() => {
      setIsLoadingCommentOnPost(false);
    });
  };

  // Passing state to value to be passed to provider
  const value = {
    commentError,
    commentList,
    getCommentListData,
  };
  return (
    <commentContext.Provider value={value}>{children}</commentContext.Provider>
  );
};

/** A hook for consuming our Comment context in a safe way
 *
 * @example //getting the comment list
 * import { useCommentListData } from 'commentContext'
 * const { commentList } = useCommentListData();
 * @returns {Comment[]}
 */
export const useCommentListData = () => {
  // Destructuring value from provider
  const ctx = useContext(commentContext);

  if (ctx === undefined) {
    throw new Error('useCommentListData must be used within a CommentProvider');
  }
  const { commentList, commentError, getCommentListData } = ctx;
  if (!commentError && _.keys(commentList)?.length === 0) {
    getCommentListData();
  }

  // What we want this consumer hook to actually return
  return { commentList, commentError };
};

export const useCommentOnPostData = (postId, commentParams) => {
  const ctx = useContext(commentContext);

  if (ctx === undefined) {
    throw new Error(
      'useCommentOnPostData must be used within a CommentProvider'
    );
  }
  const { commentError, commentOnPost } = ctx;
  if (!commentError && !!postId && !!commentParams) {
    commentOnPost(postId, commentParams);
  }

  return { commentError };
};

/**
 * @typedef Comment
 * @property {string} _id
 * @property {string} userHandle
 * @property {string} postId
 * @property {string} body
 * @property {Date} createdAt
 */
