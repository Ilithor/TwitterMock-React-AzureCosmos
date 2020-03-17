import React from 'react';

// Components
import { DeleteCommentDialog } from './DeleteCommentDialog';

// Context
import { useAuthenticationData } from '../../profile/authenticationContext';
import { useCurrentUserData } from '../../profile/currentUserContext';

/** Displays delete button for comments that match the current user
 *
 * @type {IDeleteCommentComponentProps}
 * @returns {React.FunctionComponent}
 */
export const DeleteComment = ({ postId, userHandle }) => {
  const { isAuthenticated } = useAuthenticationData();
  const { currentUser } = useCurrentUserData();
  if (isAuthenticated && userHandle === currentUser?.userHandle) {
    return <DeleteCommentDialog postId={postId} />;
  }
  return <div />;
};

/**
 * @typedef IDeleteCommentComponentProps
 * @property {string} postId
 * @property {string} userHandle
 */
