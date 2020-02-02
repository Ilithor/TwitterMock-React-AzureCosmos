import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import defaultImage from '../../../images/user.png';

// Components
import { PostContent } from './PostContent';

// MUI
import { Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Context
import { useCurrentUserData, useUserListData } from '../../profile/userContext';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
});

/** View component for displaying an individual post on the site
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {object} props.post
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
    <Card className={classes.card}>
      <ManageCardMedia />
      <PostContent post={post} like={like} />
    </Card>
  );
};
