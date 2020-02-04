import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { UnlikeButton } from './UnlikeButton';
import { LikeButton } from './LikeButton';
import { CustomButton } from '../../util/CustomButton';

// Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Context
import {
  useUserAuthenticationData,
  useCurrentUserData,
} from '../profile/userContext';

/** View component for displaying either a like or unlike icon
 * 
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 */
export const Like = ({ postId, like }) => {
  const { isAuthenticated } = useUserAuthenticationData();
  const { currentUser } = useCurrentUserData();
  const alreadyLiked = () => {
    if (like?.userHandle === currentUser?.userHandle) {
      return true;
    } else {
      return false;
    }
  };

  if (!isAuthenticated) {
    return (
      <CustomButton tip='Like' component={Link} to='/login'>
        <FavoriteBorder color='primary' />
      </CustomButton>
    );
  }
  if (alreadyLiked()) {
    return <UnlikeButton postId={postId} />;
  }
  return <LikeButton postId={postId} />;
};
