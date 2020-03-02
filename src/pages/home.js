import React, { useEffect } from 'react';
import _ from 'lodash';

// Components
import { Post } from '../components/post/postList';
import { Profile } from '../components/profile';
import { NewPost } from '../components/post/newPost';
import { RecentCommentFeed } from '../components/comment/recentFeed';

// MUI
import { Grid } from '@material-ui/core';

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
  const { isAuthenticated } = useAuthenticationData();
  const { userList } = useUserListData();
  const { postList } = usePostData();
  const { likeList } = useLikeData();
  const { setCurrentPage } = useHelmetData();

  useEffect(() => {
    setCurrentPage('Home');
  });

  const PostList = () => {
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
        <PostList />
      </Grid>
      <Grid item md={4} sm={3} xs={12}>
        <Profile />
        <RecentCommentFeed />
      </Grid>
    </Grid>
  );
};
