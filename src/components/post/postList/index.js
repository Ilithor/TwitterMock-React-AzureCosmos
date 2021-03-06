import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import defaultImage from '../../../images/user.png';

// Components
import { PostContent } from './PostContent';

// MUI
import { Card, CardMedia } from '@material-ui/core';
import { useStyles } from '../post.style';

/** View component for displaying an individual post on the site
 *
 * @type {React.FunctionComponent<IPostComponentProps>}
 */
export const Post = ({ post, user, like }) => {
  const classes = useStyles();
  // const { currentUser } = useCurrentUserData();
  // const { refreshUserList } = useUserListData();
  dayjs.extend(relativeTime);
  if (!post) {
    return null;
  }

  const ManageCardMedia = () => {
    // if (post?.userHandle === currentUser?.userHandle) {
    //   if (currentUser?.bio?.userImage !== user?.userImage) {
    //     console.log('hi');
    //     refreshUserList();
    //   }
    // }
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

/**
 * @typedef IPostComponentProps
 * @property {PostData} post
 * @property {UserData} user
 * @property {LikeData} like
 */
