import React, { useState, useEffect } from 'react';

// Components
import Post from '../components/post/postList';
import StaticProfile from '../components/profile/static';

// MUI
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { getUserPostAction } from '../redux/actions/userActions';
import { getUserData } from '../util/fetch/user';

const User = ({ match, data, getUserPostAction }) => {
  const [profile, setProfile] = useState(null);
  const [postList, setPostList] = useState(null);
  const handle = match.params.handle;
  useEffect(() => {
    getProfileData(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const postData = data.postList?.filter(post => post.userHandle === handle);
    setPostList && postData && setPostList(postData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.postList]);

  const getProfileData = handle => {
    getUserData(handle).then(res => setProfile(res.data.user));
  };

  const postListMarkup = () => {
    if (data.isLoading) {
      return <p>Loading...</p>;
    }
    if (postList === null) {
      return <p>No posts from this user</p>;
    }
    return postList?.map(post => (
      <Post key={`post-${post.postId}`} post={post} />
    ));
  };

  const createStaticProfile = () => {
    if (!profile) {
      return <p>Loading...</p>;
    }
    return <StaticProfile profile={profile} />;
  };

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} sx={12}>
        {postListMarkup()}
      </Grid>
      <Grid item sm={4} sx={12}>
        {createStaticProfile()}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ data }) => ({ data });

export default connect(
  mapStateToProps,
  { getUserPostAction }
)(User);
