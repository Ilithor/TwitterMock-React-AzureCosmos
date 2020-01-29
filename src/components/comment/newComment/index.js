import React from 'react';

// Components
import { CommentForm } from './CommentForm';

// Context
import { useUserAuthenticationData } from '../../profile/userContext';

export const NewComment = ({ postId }) => {
  const { isAuthenticated } = useUserAuthenticationData();
  
  const createCommentForm = () => {
    if (!!isAuthenticated) {
      return <CommentForm postId={postId} />;
    }
    return <div />;
  };

  return createCommentForm();
};
