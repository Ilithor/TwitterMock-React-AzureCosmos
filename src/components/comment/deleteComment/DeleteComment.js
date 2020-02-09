import React from 'react';

// Components
import { DeleteCommentDialog } from './DeleteCommentDialog';

// Context
import { useAuthenticationData } from '../../profile/authenticationContext';
import { useCurrentUserData } from '../../profile/currentUserContext';

/** Displays delete button for comments that match the current user
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 * @param {string} props.userHandle
 */
export const DeleteComment = ({ postId, userHandle }) => {
  const { isAuthenticated } = useAuthenticationData();
  const { currentUser } = useCurrentUserData();
  if (isAuthenticated && userHandle === currentUser?.userHandle) {
    return <DeleteCommentDialog postId={postId} />;
  }
  return <div />;
};
