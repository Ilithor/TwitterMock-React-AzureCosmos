import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

// Components
import { Post } from '../components/post/postList';
import { StaticProfile } from '../components/profile/static';

// MUI
import { Grid } from '@material-ui/core';

// Context
import { useUserListData } from '../components/profile/user/userListContext';
import { usePostData } from '../components/post/postContext';
import { useLikeData } from '../components/like/likeContext';
import { useHelmetData } from '../util/helmetContext';

/** Displays the user's profile page
 *
 * @returns {React.FunctionComponent}
 */
export const UserPage = () => {
  const { postList } = usePostData();
  const { userList } = useUserListData();
  const { likeList } = useLikeData();
  const { setCurrentPage } = useHelmetData();
  const [userPostList, setUserPostList] = useState({});
  const [userStaticProfile, setUserStaticProfile] = useState({});
  const params = useParams();
  useEffect(() => {
    const userData = _.values(userList).filter(
      user => user?.userHandle === params.userHandle
    );
    if (userData) {
      setUserStaticProfile(userData[0]);
    }
    const postData = _.values(postList).filter(
      post => post?.userHandle === params.userHandle
    );
    if (postData) {
      setUserPostList(postData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList, postList, userStaticProfile]);
  useEffect(() => {
    if (userStaticProfile) {
      setCurrentPage(`${userStaticProfile?.userHandle}'s Profile`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStaticProfile]);
  const PostList = () => {
    if (userPostList.length === 0) {
      return <p>No posts from this user</p>;
    }
    if (userPostList) {
      return _.map(userPostList, post => {
        if (post?.postId !== params.postId) {
          return (
            <Post
              key={`post-${post?.postId}`}
              post={post}
              user={userList?.[post?.userHandle]}
              like={likeList?.[post?.postId]}
            />
          );
        }
        return (
          <Post
            key={`post-${post?.postId}`}
            post={post}
            user={userList?.[post?.userHandle]}
            like={likeList?.[post?.postId]}
          />
        );
      });
    }
  };
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} sx={12}>
        <PostList />
      </Grid>
      <Grid item sm={4} sx={12}>
        <StaticProfile user={userStaticProfile} />
      </Grid>
    </Grid>
  );
};
