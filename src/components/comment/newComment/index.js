import React from 'react';

// Components
import { CommentForm } from './CommentForm';

// Context
import { useAuthenticationData } from '../../profile/authenticationContext';

/** Displays the new comment form if the user is authenticated
 *
 * @type {INewCommentComponentProps}
 * @returns {React.FunctionComponent}
 */
export const NewComment = ({ postId }) => {
  const { isAuthenticated } = useAuthenticationData();

  const createCommentForm = () => {
    if (isAuthenticated) {
      return <CommentForm postId={postId} />;
    }
    return <div />;
  };

  return createCommentForm();
};

/**
 * @typedef INewCommentComponentProps
 * @property {string} postId
 */
