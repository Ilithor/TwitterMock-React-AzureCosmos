import React from 'react';

// Components
import { DeletePostDialog } from './DeletePostDialog';

// Context
import { useCurrentUserData } from '../../../profile/currentUserContext';
import { useAuthenticationData } from '../../../profile/authenticationContext';

/** Displays the delete post button when authenticated
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 * @param {string} props.userHandle
 */
export const DeletePost = ({ postId, userHandle }) => {
  const { isAuthenticated } = useAuthenticationData();
  const { currentUser } = useCurrentUserData();
  if (isAuthenticated && userHandle === currentUser?.userHandle) {
    return <DeletePostDialog postId={postId} />;
  }
  return <div />;
};
