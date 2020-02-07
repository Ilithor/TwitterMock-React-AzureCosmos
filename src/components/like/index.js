import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { UnlikeButton } from './UnlikeButton';
import { LikeButton } from './LikeButton';
import { CustomButton } from '../../util/CustomButton';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import {
  useUserAuthenticationData,
  useCurrentUserData,
} from '../profile/userContext';
import { useLikeData } from './likeContext';
import { usePostData } from '../post/postContext';

/** View component for displaying either a like or unlike icon
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 * @param {object} props.like
 */
export const Like = ({ postId, like }) => {
  const { isAuthenticated } = useUserAuthenticationData();
  const { currentUser } = useCurrentUserData();
  const { refreshPostList } = usePostData();
  const { likePost, unlikePost, refreshLikeList } = useLikeData();
  const alreadyLiked = () => {
    if (like?.userHandle === currentUser?.userHandle) {
      return true;
    } else {
      return false;
    }
  };
  const onClickLike = () => {
    likePost(postId).then(() => {
      Promise.all([refreshPostList(), refreshLikeList()]);
    });
  };
  const onClickUnlike = () => {
    unlikePost(postId).then(() => {
      Promise.all([refreshPostList(), refreshLikeList()]);
    });
  };
  if (!isAuthenticated) {
    return (
      <CustomButton tip='Like' component={Link} to='/login'>
        <Icon.FavoriteBorder color='primary' />
      </CustomButton>
    );
  }
  if (alreadyLiked()) {
    return <UnlikeButton onClick={onClickUnlike} />;
  }
  return <LikeButton onClick={onClickLike} />;
};
