import React from 'react';

// Components
import { DeletePostDialog } from './DeletePostDialog';

// Context
import {
  useUserAuthenticationData,
  useCurrentUserData,
} from '../../../profile/userContext';

/** Displays the delete post button when authenticated
 * 
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 * @param {string} props.userHandle
 */
export const DeletePost = ({ postId, userHandle }) => {
  const { isAuthenticated } = useUserAuthenticationData();
  const { currentUser } = useCurrentUserData();
  if (isAuthenticated && userHandle === currentUser?.userHandle) {
    return <DeletePostDialog postId={postId} />;
  }
  return <div />;
};
