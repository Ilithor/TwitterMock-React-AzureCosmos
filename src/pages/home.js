import React, { useEffect } from 'react';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';

// Components
import { Post } from '../components/post/postList';
import { Profile } from '../components/profile';
import { NewPost } from '../components/post/newPost';
import { RecentCommentFeed } from '../components/comment/recentFeed';

// MUI
import { Grid, CircularProgress } from '@material-ui/core';
import { useStyles } from './page.style';

// Context
import { useUserListData } from '../components/profile/user/userListContext';
import { useAuthenticationData } from '../components/profile/authenticationContext';
import { usePostData } from '../components/post/postContext';
import { useLikeData } from '../components/like/likeContext';
import { useHelmetData } from '../util/helmetContext';

/** Displays the home page
 *
 * @returns {React.FunctionComponent}
 */
export const HomePage = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuthenticationData();
  const { userList, isLoadingUserList, userListError } = useUserListData();
  const { postList } = usePostData();
  const { likeList } = useLikeData();
  const { setCurrentPage } = useHelmetData();

  useEffect(() => {
    setCurrentPage('Home');
  });

  const PostList = () => {
    if (isLoadingUserList) {
      return (
        <div className={classes?.spinnerDiv}>
          <CircularProgress size={150} thickness={2} />
        </div>
      );
    }
    if (userListError) {
      toast.error(userListError, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 8000,
      });
    }
    if (userList) {
      return _.map(postList, post => (
        <Post
          key={`post-${post?.postId}`}
          post={post}
          user={userList?.[post?.userHandle]}
          like={likeList?.[post?.postId]}
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
        <ToastContainer />
        <PostList />
      </Grid>
      <Grid item md={4} sm={3} xs={12}>
        <Profile />
        <RecentCommentFeed />
      </Grid>
    </Grid>
  );
};
