import React from 'react';
import _ from 'lodash';

// Components
import { Post } from '../components/post/postList';
import { Profile } from '../components/profile';
import { NewPost } from '../components/post/newPost';

// MUI
import { Grid, CircularProgress } from '@material-ui/core';
import { useStyles } from './page.style';

// Context
import {
  useUserAuthenticationData,
  useUserListData,
} from '../components/profile/userContext';
import { usePostData } from '../components/post/postContext';
import { useLikeData } from '../components/like/likeContext';

/** Displays the home page
 *
 * @type {React.FunctionComponent}
 */
export const HomePage = () => {
  const classes = useStyles();
  const { isAuthenticated } = useUserAuthenticationData();
  const { userList, isLoadingUserList } = useUserListData();
  const { postList, isLoadingPostList } = usePostData();
  const { likeList, isLoadingLikeList } = useLikeData();

  const RecentPostMarkup = () => {
    if (!isLoadingLikeList && !isLoadingPostList && !isLoadingUserList) {
      return createNewPostList();
    }
    return (
      <div className={classes?.spinnerDiv}>
        <CircularProgress size={150} thickness={2} />
      </div>
    );
  };

  const createNewPostList = () => {
    if (userList) {
      return _.map(postList, post => (
        <Post
          key={`post-${post?.postId}`}
          post={post}
          user={userList[post?.userHandle]}
          like={likeList[post?.postId]}
        />
      ));
    }
    return <div />;
  };

  const CreatePostEditor = () => {
    if (isAuthenticated) {
      return <NewPost />;
    }
    return <div />;
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={8} sm={9} xs={12}>
        <CreatePostEditor />
        <RecentPostMarkup />
      </Grid>
      <Grid item md={4} sm={3} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};
