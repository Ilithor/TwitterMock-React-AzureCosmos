import React from 'react';

// Components
import { DeletePostDialog } from './DeletePostDialog';

// Context
import { useCurrentUserData } from '../../../profile/currentUserContext';
import { useAuthenticationData } from '../../../profile/authenticationContext';

/** Displays the delete post button when authenticated
 *
 * @type {IDeletePostComponentProps}
 * @returns {React.FunctionComponent}
 */
export const DeletePost = ({ postId, userHandle }) => {
  const { isAuthenticated } = useAuthenticationData();
  const { currentUser } = useCurrentUserData();
  if (isAuthenticated && userHandle === currentUser?.userHandle) {
    return <DeletePostDialog postId={postId} />;
  }
  return <div />;
};

/**
 * @typedef IDeletePostComponentProps
 * @property {string} postId
 * @property {string} userHandle
 */
