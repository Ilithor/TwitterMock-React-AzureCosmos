import React from 'react';

// Components
import { DeleteCommentDialog } from './DeleteCommentDialog';

// Context
import {
  useUserAuthenticationData,
  useCurrentUserData,
} from '../../profile/userContext';

export const DeleteComment = ({ postId, userHandle }) => {
  const { isAuthenticated } = useUserAuthenticationData();
  const { currentUser } = useCurrentUserData();
  if (isAuthenticated && userHandle === currentUser?.userHandle) {
    return <DeleteCommentDialog postId={postId} />;
  }
  return <div />;
};
