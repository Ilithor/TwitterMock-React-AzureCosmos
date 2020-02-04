import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';

import * as fetchUtil from '../../util/fetch';

/** @type {React.Context<{commentList:Comment[],commentError:Error,getData:()=>void}} */
const commentContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {React.ReactChild} props.children 
 */
export const CommentProvider = ({ children }) => {
  const [commentError, setCommentError] = useState();
  const [lastRefreshCommentList, setLastRefreshCommentList] = useState();
  const [commentList, setCommentList] = useState();
  const [isLoadingCommentList, setIsLoadingCommentList] = useState(false);
  const [isLoadingCommentOnPost, setIsLoadingCommentOnPost] = useState(false);
  const [isLoadingDeleteComment, setIsLoadingDeleteComment] = useState(false);

  /** Refreshes the comment list
   *
   * @returns {void | Error}
   */
  const refreshCommentList = async () => {
    if (!isLoadingCommentList) {
      setIsLoadingCommentList(true);
      // Fetch list of comments
      await fetchUtil.post
        .fetchCommentList()
        .then(res => {
          setCommentList(_.keyBy(res.data, 'commentId'));
        })
        .catch(err => {
          setCommentError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setLastRefreshCommentList(Date.now);
          setIsLoadingCommentList(false);
          return Promise.resolve();
        });
    }
  };

  /** Creates a new comment on a post
   *
   * @param {string} postId
   * @param {object} commentData
   * @returns {void | Error}
   */
  const commentOnPost = async (postId, commentData) => {
    if (postId && commentData && !isLoadingCommentOnPost) {
      setIsLoadingCommentOnPost(true);
      await fetchUtil.post
        .commentOnPost(postId, commentData)
        .then(async () => {
          await refreshCommentList();
        })
        .catch(err => {
          setCommentError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingCommentOnPost(false);
          return Promise.resolve();
        });
    }
  };

  /** Deletes user comment
   *
   * @param {string} commentId CommentId of the comment being deleted
   * @returns {void | Error}
   */
  const deleteComment = async commentId => {
    if (commentId && !isLoadingDeleteComment) {
      setIsLoadingDeleteComment(true);
      await fetchUtil.post
        .deleteComment(commentId)
        .then(async () => {
          await refreshCommentList();
        })
        .catch(err => {
          setCommentError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingDeleteComment(false);
          return Promise.resolve();
        });
    }
  };

  // Passing state to value to be passed to provider
  const value = {
    commentError,
    commentList,
    isLoadingCommentOnPost,
    commentOnPost,
    refreshCommentList,
    lastRefreshCommentList,
    deleteComment,
  };
  return (
    <commentContext.Provider value={value}>{children}</commentContext.Provider>
  );
};

/** A hook for consuming our Comment context in a safe way
 *
 * @example //getting the comment deleting function
 * import { useCommentData } from 'commentContext'
 * const { deleteComment } = useCommentData();
 * @returns {()=>void, boolean}
 */
export const useCommentData = () => {
  const ctx = useContext(commentContext);

  if (ctx === undefined) {
    throw new Error('useCommentData must be used within a CommentProvider');
  }

  const { deleteComment, isLoadingDeleteComment } = ctx;

  return { deleteComment, isLoadingDeleteComment };
};

/** A hook for consuming our Comment context in a safe way
 *
 * @example //getting the comment list
 * import { useCommentListData } from 'commentContext'
 * const { commentList } = useCommentListData();
 * @returns {Comment[], Error, ()=>void}
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
    (!lastRefreshCommentList || lastRefreshCommentList + 600 <= Date.now)
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

/** A hook for consuming our Comment context in a safe way
 *
 * @example //getting the comment list
 * import { useCommentOnPostData } from 'commentContext'
 * const { commentOnPost } = useCommentOnPostData();
 * @returns {Error, Boolean, ()=>void}
 */
export const useCommentOnPostData = () => {
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
