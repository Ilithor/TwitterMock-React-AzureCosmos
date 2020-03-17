import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';

import * as fetchUtil from '../../util/fetch';

/** @type {CommentContextProps} */
const commentContext = createContext();

/**
 * @typedef CommentContextProps
 * @property {Error} commentError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setCommentError
 * @property {Error} commentValidationError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setCommentValidationError
 * @property {Date} lastRefreshCommentList
 * @property {React.Dispatch<React.SetStateAction<Date>>} setLastRefreshCommentList
 * @property {_.Dictionary<Comment>} commentList
 * @property {React.Dispatch<React.SetStateAction<_.Dictionary<Comment>>>} setCommentList
 * @property {boolean} isLoadingCommentList
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingCommentList
 * @property {boolean} isLoadingCommentOnPost
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingCommentOnPost
 * @property {boolean} isLoadingDeleteComment
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingDeleteComment
 * @property {()=>void} refreshCommentList
 * @property {(postId:string,commentData:UserCommentParam)=>void} commentOnPost
 * @property {(commentParam:string)=>commentParam} validationCheckComment
 * @property {(string:string)=>boolean} isEmpty
 * @property {(commentId:string)=>void} deleteComment
 *
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @type {ICommentProviderComponentProps}
 * @returns {React.FunctionComponent}
 */
export const CommentProvider = ({ children }) => {
  const [commentError, setCommentError] = useState();
  const [commentValidationError, setCommentValidationError] = useState();
  const [lastRefreshCommentList, setLastRefreshCommentList] = useState();
  /** @type {UseStateResult<_.Dictionary<Comment>>} */
  const [commentList, setCommentList] = useState();
  const [isLoadingCommentList, setIsLoadingCommentList] = useState(false);
  const [isLoadingCommentOnPost, setIsLoadingCommentOnPost] = useState(false);
  const [isLoadingDeleteComment, setIsLoadingDeleteComment] = useState(false);

  /** Refreshes the comment list
   *
   * @returns {Promise}
   */
  const refreshCommentList = async () => {
    if (!isLoadingCommentList) {
      setIsLoadingCommentList(true);
      setLastRefreshCommentList(Date.now());
      // Fetch list of comments
      await fetchUtil.post
        .fetchCommentList()
        .then(res => {
          if (Array.isArray(res?.data)) {
            setCommentList(_.keyBy(res.data, 'commentId'));
          } else {
            setCommentError(res?.data);
            return Promise.reject(res?.data);
          }
        })
        .catch(err => {
          setCommentError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingCommentList(false);
          return;
        });
    }
  };

  /** Creates a new comment on a post
   *
   * @param {string} postId
   * @param {UserCommentParam} commentData
   * @returns {Promise}
   */
  const commentOnPost = async (postId, commentData) => {
    if (postId && commentData && !isLoadingCommentOnPost) {
      setIsLoadingCommentOnPost(true);
      await fetchUtil.post
        .commentOnPost(postId, commentData)
        .then(async res => {
          if (res?.data === true) {
            await refreshCommentList();
          } else {
            return Promise.reject(res?.data);
          }
        })
        .catch(err => {
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingCommentOnPost(false);
          return;
        });
    }
  };

  /** Saves any errors in validation in commentError state
   *
   * @param {string} commentParam
   * @returns {commentParam}
   */
  const validationCheckComment = commentParam => {
    const err = {};
    if (isEmpty(commentParam)) {
      err.comment = 'Must not be empty';
    }
    if (err?.comment) {
      setCommentValidationError(err);
      return commentParam;
    }
    return commentParam;
  };

  /** Checks if provided string is empty
   *
   * @param {string} string
   * @returns {boolean}
   */
  const isEmpty = string => {
    if (string.trim() === '') {
      return true;
    } else {
      return false;
    }
  };

  /** Deletes user comment
   *
   * @param {string} commentId
   * @returns {Promise}
   */
  const deleteComment = async commentId => {
    if (commentId && !isLoadingDeleteComment) {
      setIsLoadingDeleteComment(true);
      await fetchUtil.post
        .deleteComment(commentId)
        .then(async res => {
          if (res?.data === true) {
            await refreshCommentList();
          } else {
            return Promise.reject(res?.data);
          }
        })
        .catch(err => {
          setCommentError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingDeleteComment(false);
          return;
        });
    }
  };

  // Passing state to value to be passed to provider
  const value = {
    commentError,
    setCommentError,
    commentList,
    isLoadingCommentOnPost,
    commentOnPost,
    refreshCommentList,
    lastRefreshCommentList,
    deleteComment,
    validationCheckComment,
    commentValidationError,
    setCommentValidationError,
  };
  return (
    <commentContext.Provider value={value}>{children}</commentContext.Provider>
  );
};

/**
 * @typedef UseCommentDataResult
 * @property {(commentId:string)=>void} deleteComment
 * @property {boolean} isLoadingDeleteComment
 */

/** A hook for consuming our Comment context in a safe way
 *
 * @example //getting the comment deleting function
 * import { useCommentData } from 'commentContext'
 * const { deleteComment } = useCommentData();
 * @returns {UseCommentDataResult}
 */
export const useCommentData = () => {
  const ctx = useContext(commentContext);

  if (ctx === undefined) {
    throw new Error('useCommentData must be used within a CommentProvider');
  }

  const { deleteComment, isLoadingDeleteComment } = ctx;

  return { deleteComment, isLoadingDeleteComment };
};

/**
 * @typedef UseCommentListDataResult
 * @property {_.Dictionary<Comment>} commentList
 * @property {Error} commentError
 * @property {()=>void} refreshCommentList
 */

/** A hook for consuming our Comment context in a safe way
 *
 * @example //getting the comment list
 * import { useCommentListData } from 'commentContext'
 * const { commentList } = useCommentListData();
 * @returns {UseCommentListDataResult}
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
    (!commentList ||
      !lastRefreshCommentList ||
      lastRefreshCommentList + 600000 <= Date.now())
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

/**
 * @typedef UseCommentOnPostDataResult
 * @property {Error} commentError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setCommentError
 * @property {boolean} isLoadingCommentOnPost
 * @property {(postId:string,commentData:UserCommentParam)=>void} commentOnPost
 */

/** A hook for consuming our Comment context in a safe way
 *
 * @example //getting the comment list
 * import { useCommentOnPostData } from 'commentContext'
 * const { commentOnPost } = useCommentOnPostData();
 * @returns {UseCommentOnPostDataResult}
 */
export const useCommentOnPostData = () => {
  const ctx = useContext(commentContext);

  if (ctx === undefined) {
    throw new Error(
      'useCommentOnPostData must be used within a CommentProvider'
    );
  }
  const {
    commentError,
    setCommentError,
    commentOnPost,
    isLoadingCommentOnPost,
  } = ctx;

  return {
    commentError,
    setCommentError,
    isLoadingCommentOnPost,
    commentOnPost,
  };
};

/**
 * @typedef UseCommentValidationDataResult
 * @property {(commentParam:string)=>commentParam} validationCheckComment
 * @property {Error} commentValidationError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setCommentValidationError
 */

/** A hook for consuming our Comment context in a safe way
 *
 * @example //validating comment data
 * import { useCommentValidationData } from 'commentContext'
 * const { validationCheckComment } = useCommentValidationData();
 * @returns {UseCommentValidationDataResult}
 */
export const useCommentValidationData = () => {
  const ctx = useContext(commentContext);

  if (ctx === undefined) {
    throw new Error(
      'useCommentValidationData must be used within a CommentProvider'
    );
  }

  const {
    validationCheckComment,
    commentValidationError,
    setCommentValidationError,
  } = ctx;

  return {
    validationCheckComment,
    commentValidationError,
    setCommentValidationError,
  };
};

/**
 * @typedef ICommentProviderComponentProps
 * @property {React.ReactChild} children
 */

/**
 * @typedef Comment
 * @property {string} _id
 * @property {string} userHandle
 * @property {string} postId
 * @property {string} body
 * @property {Date} createdAt
 */

/**
 * @typedef UserCommentParam
 * @property {string} body
 */
