import React from 'react';

// Components
import { DeletePostDialog } from './DeletePostDialog';
import {
  useUserAuthenticationData,
  useCurrentUserData,
} from '../../../profile/userContext';

/** Displays the delete post button when authenticated
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {string} props.postId
 * @param {any} props.deleteUserPost
 */
export const DeletePost = ({ postId, userHandle }) => {
  const { isAuthenticated } = useUserAuthenticationData();
  const { currentUser } = useCurrentUserData();
  if (isAuthenticated && userHandle === currentUser?.handle) {
    return <DeletePostDialog postId={postId} />;
  } else {
    return <div />;
  }
};
