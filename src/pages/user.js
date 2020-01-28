import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

// Components
import { Post } from '../components/post/postList';
import { StaticProfile } from '../components/profile/static';

// MUI
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Context
import { usePostData } from '../components/post/postContext';
import { useUserListData } from '../components/context/userContext';

const useStyles = makeStyles({
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

/** Displays the user's profile page
 */
export const UserPage = () => {
  const { postList, isLoadingPostList } = usePostData();
  const { userList } = useUserListData();
  const [userPostList, setUserPostList] = useState({});
  const [profile, setProfile] = useState({});
  const classes = useStyles();
  const params = useParams();
  useEffect(() => {
    const postData = _.values(postList).filter(
      post => post?.userHandle === params.handle
    );
    if (postData) {
      setUserPostList(postData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postList]);
  useEffect(() => {
    const userData = _.values(userList).filter(
      user => user?.handle === params.handle
    );
    if (userData) {
      setProfile(userData[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList]);
  const PostListMarkup = () => {
    if (isLoadingPostList) {
      return (
        <div className={classes?.spinnerDiv}>
          <CircularProgress size={150} thickness={2} />
        </div>
      );
    }
    if (userPostList === null) {
      return <p>No posts from this user</p>;
    }
    if (!isLoadingPostList) {
      return _.map(userPostList, post => {
        if (post?.postId !== params.postId) {
          return (
            <Post
              key={`post-${post?.postId}`}
              post={post}
              user={userList[(post?.userHandle)]}
            />
          );
        }
        return (
          <Post
            key={`post-${post?.postId}`}
            post={post}
            user={userList[(post?.userHandle)]}
          />
        );
      });
    }
  };

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} sx={12}>
        <PostListMarkup />
      </Grid>
      <Grid item sm={4} sx={12}>
        <StaticProfile profile={profile} />
      </Grid>
    </Grid>
  );
};
