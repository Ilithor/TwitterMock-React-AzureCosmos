import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { UnlikeButton } from './UnlikeButton';
import { LikeButton } from './LikeButton';
import { CustomButton } from '../../util/CustomButton';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useCurrentUserData } from '../profile/currentUserContext';
import { useAuthenticationData } from '../profile/authenticationContext';
import { useLikeData } from './likeContext';
import { usePostData } from '../post/postContext';

/** View component for displaying either a like or unlike icon
 *
 * @type {ILikeComponentProps}
 * @returns {React.FunctionComponent}
 */
export const Like = ({ postId, like }) => {
  const { isAuthenticated } = useAuthenticationData();
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
      <CustomButton tip='Like' link={Link} to='/login'>
        <Icon.FavoriteBorder color='primary' />
      </CustomButton>
    );
  }
  if (alreadyLiked()) {
    return <UnlikeButton onClick={onClickUnlike} />;
  }
  return <LikeButton onClick={onClickLike} />;
};

/**
 * @typedef ILikeComponentProps
 * @property {string} postId
 * @property {Like} like
 */

/**
 * @typedef Like
 * @property {string} userHandle
 * @property {string} postId
 */
