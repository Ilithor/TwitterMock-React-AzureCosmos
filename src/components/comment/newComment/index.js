import React from 'react';

// Components
import { CommentForm } from './CommentForm';

// Context
import { useUserAuthenticationData } from '../../profile/userContext';

/** Displays the new comment form if the user is authenticated
 * 
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 */
export const NewComment = ({ postId }) => {
  const { isAuthenticated } = useUserAuthenticationData();

  const createCommentForm = () => {
    if (isAuthenticated) {
      return <CommentForm postId={postId} />;
    }
    return <div />;
  };

  return createCommentForm();
};
