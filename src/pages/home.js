import React, { useEffect } from 'react';

// Components
import Post from '../components/post/postList';
import Profile from '../components/profile';

// MUI
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { getPostList } from '../redux/actions/dataActions';

export const Home = ({ postList, isLoading, getPostList }) => {
  useEffect(() => getPostList());
  let recentPostMarkup;
  if (!isLoading) {
    recentPostMarkup = postList.map(post => (
      <Post key={post.postId} post={post} />
    ));
  } else {
    recentPostMarkup = <p>Loading...</p>;
  }
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentPostMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  const postList = state.data.postList;
  const isLoading = state.data.isLoading;
  return {
    postList,
    isLoading,
  };
};

export default connect(
  mapStateToProps,
  { getPostList }
)(Home);
