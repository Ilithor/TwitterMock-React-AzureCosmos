import React from 'react';

// Components
import { DeleteCommentDialog } from './DeleteCommentDialog';

// Context
import {
  useUserAuthenticationData,
  useCurrentUserData,
} from '../../profile/userContext';

/** Displays delete button for comments that match the current user
 * 
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 * @param {string} props.userHandle
 */
export const DeleteComment = ({ postId, userHandle }) => {
  const { isAuthenticated } = useUserAuthenticationData();
  const { currentUser } = useCurrentUserData();
  if (isAuthenticated && userHandle === currentUser?.userHandle) {
    return <DeleteCommentDialog postId={postId} />;
  }
  return <div />;
};
