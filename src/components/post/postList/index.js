import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import defaultImage from '../../../images/user.png';

// Components
import { PostContent } from './PostContent';

// MUI
import { Card, CardMedia } from '@material-ui/core';
import { useStyles } from '../post.style';

// Context
import { useCurrentUserData } from '../../profile/currentUserContext';
import { useUserListData } from '../../profile/user/userListContext';

/** View component for displaying an individual post on the site
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.post
 * @param {object} props.user
 * @param {object} props.like
 */
export const Post = ({ post, user, like }) => {
  const classes = useStyles();
  const { currentUser } = useCurrentUserData();
  const { refreshUserList } = useUserListData();
  dayjs.extend(relativeTime);
  if (!post) {
    return;
  }

  const ManageCardMedia = () => {
    if (post?.userHandle === currentUser?.userHandle) {
      if (currentUser?.bio?.userImage !== user?.userImage) {
        refreshUserList();
      }
    }
    return (
      <CardMedia
        image={user?.userImage || defaultImage}
        title='Profile image'
        className={classes?.image}
      />
    );
  };

  return (
    <Card className={classes?.card}>
      <ManageCardMedia />
      <PostContent post={post} like={like} />
    </Card>
  );
};
