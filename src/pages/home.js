import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

// Components
import { Post } from '../components/post/postList';
import { Profile } from '../components/profile';
import { NewPost } from '../components/post/newPost';

// MUI
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import {
  useUserAuthenticationData,
  useUserListData,
} from '../components/context/userContext';
import { usePostData } from '../components/post/postContext';
import { useLikeData } from '../components/like/likeContext';

const useStyles = makeStyles({
  createButton: {
    position: 'relative',
    left: '33%',
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
  const {
    isAuthenticated,
    isLoadingAuthenticated,
  } = useUserAuthenticationData();
  const { userList, isLoadingUserList } = useUserListData();
  const { postList, isLoadingPostList } = usePostData();
  const { likeList, isLoadingLikeList } = useLikeData();

  const RecentPostMarkup = () => {
    if (!isLoadingPostList && !isLoadingUserList && !isLoadingLikeList) {
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
        user={userList[(post?.userHandle)]}
        like={likeList[(post?.postId)]}
      />
    ));
  };

  const CreatePostEditor = () => {
    if (isAuthenticated && !isLoadingAuthenticated) {
      return <NewPost />;
    }
    return (
      <Link to='/login'>
        <Button
          variant='contained'
          className={classes?.createButton}
          color='primary'
        >
          <Icon.Add className={classes?.extendedIcon} />
          Create Post
        </Button>
      </Link>
    );
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
