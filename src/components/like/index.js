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
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {boolean} props.isAuthenticated
 * @param {string} props.postId
 * @param {array} props.likeList
 */
export const Like = ({ postId, like, userHandle }) => {
  const { isAuthenticated } = useUserAuthenticationData();
  const { currentUser } = useCurrentUserData();
  const alreadyLiked = () => {
    if (like?.userHandle !== currentUser?.userHandle) {
      return true;
    } else {
      return false;
    }
  };

  if (!isAuthenticated) {
    return (
      <Link to='/login'>
        <CustomButton tip='Like'>
          <FavoriteBorder color='primary' />
        </CustomButton>
      </Link>
    );
  }
  if (alreadyLiked()) {
    return <UnlikeButton postId={postId} />;
  }
  return <LikeButton postId={postId} />;
};
