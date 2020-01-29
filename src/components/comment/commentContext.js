import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';

import * as fetchUtil from '../../util/fetch';

/** @type {React.Context<{commentList:Comment[],commentError:Error,getData:()=>void}} */
const commentContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @param {()=>Promise<import('axios').AxiosResponse<Comment[]>>} props.fetchCommentList
 */
export const CommentProvider = ({ children }) => {
  /** @type {Comment[]} */
  const defaultState = [];
  const [commentError, setCommentError] = useState();
  const [lastRefreshCommentList, setLastRefreshCommentList] = useState();
  const [commentList, setCommentList] = useState(defaultState);
  const [isLoadingCommentList, setIsLoadingCommentList] = useState(false);
  const [isLoadingCommentOnPost, setIsLoadingCommentOnPost] = useState(false);

  const refreshCommentList = () =>
    new Promise((resolve, reject) => {
      if (!isLoadingCommentList) {
        setIsLoadingCommentList(true);
        // Fetch list of comments
        fetchUtil.post
          .fetchCommentList()
          .then(res => {
            setCommentList(_.keyBy(res?.data, 'commentId'));
            resolve(commentList);
          })
          .catch(err => {
            setCommentError(err);
            reject(err);
          })
          .finally(() => {
            setLastRefreshCommentList(Date.now);
            setIsLoadingCommentList(false);
          });
      }
    });

  const commentOnPost = (postId, commentData) =>
    new Promise((resolve, reject) => {
      if (postId && commentData && !isLoadingCommentOnPost) {
        setIsLoadingCommentOnPost(true);
        fetchUtil.post
          .commentOnPost(postId, commentData)
          .then(async () => {
            refreshCommentList();
            resolve(commentList);
          })
          .catch(err => {
            setCommentError(err);
            reject(err);
          })
          .finally(() => setIsLoadingCommentOnPost(false));
      }
    });

  // Passing state to value to be passed to provider
  const value = {
    commentError,
    commentList,
    isLoadingCommentOnPost,
    commentOnPost,
    refreshCommentList,
    lastRefreshCommentList,
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
  const {
    commentList,
    commentError,
    refreshCommentList,
    lastRefreshCommentList,
    isLoadingCommentList,
  } = ctx;

  if (
    !isLoadingCommentList &&
    (_.keys(commentList).length === 0 ||
      lastRefreshCommentList === null ||
      lastRefreshCommentList >= Date.now + 600)
  ) {
    refreshCommentList();
  }

  // What we want this consumer hook to actually return
  return {
    commentList,
    commentError,
    refreshCommentList,
  };
};

export const useCommentOnPostData = (postId, commentParams) => {
  const ctx = useContext(commentContext);

  if (ctx === undefined) {
    throw new Error(
      'useCommentOnPostData must be used within a CommentProvider'
    );
  }
  const { commentError, commentOnPost, isLoadingCommentOnPost } = ctx;

  return { commentError, isLoadingCommentOnPost, commentOnPost };
};

/**
 * @typedef Comment
 * @property {string} _id
 * @property {string} userHandle
 * @property {string} postId
 * @property {string} body
 * @property {Date} createdAt
 */
