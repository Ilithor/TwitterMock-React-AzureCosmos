import React from 'react';
import _ from 'lodash';

// Components
import { Post } from '../components/post/postList';
import { Profile } from '../components/profile';
import { NewPost } from '../components/post/newPost';

// MUI
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Context
import {
  useUserAuthenticationData,
  useUserListData,
} from '../components/profile/userContext';
import { usePostData } from '../components/post/postContext';
import { useLikeData } from '../components/like/likeContext';

const useStyles = makeStyles({
  createButton: {
    position: 'relative',
    textAlign: 'center',
    marginBottom: 20,
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

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
    return _.map(postList, post => (
      <Post
        key={`post-${post?.postId}`}
        post={post}
        user={userList[post?.userHandle]}
        like={likeList[post?.postId]}
      />
    ));
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
