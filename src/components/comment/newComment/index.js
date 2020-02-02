import React from 'react';

// Components
import { CommentForm } from './CommentForm';

// MUI
import { useStyles } from '../comment.style'

// Context
import { useUserAuthenticationData } from '../../profile/userContext';

export const NewComment = ({ postId }) => {
  const classes = useStyles();
  const { isAuthenticated } = useUserAuthenticationData();

  const createCommentForm = () => {
    if (isAuthenticated) {
      return <CommentForm postId={postId} classes={classes} />;
    }
    return <div />;
  };

  return createCommentForm();
};
