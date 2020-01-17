import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import Post from '../components/post/postList';
import Profile from '../components/profile';
import NewPost from '../components/post/newPost';

// MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../style/style';

// Icons
import AddIcon from '@material-ui/icons/Add';

// Redux
import { connect } from 'react-redux';
import { getPostList } from '../redux/actions/dataActions';
import { getUserDataAction } from '../redux/actions/userActions';

export const Home = ({
  classes = {},
  postList,
  isLoading,
  getPostList,
  getUserDataAction,
  isAuthenticated,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getPostList(), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getUserDataAction(localStorage.Handle), []);
  const makeRecentPostMarkup = () => {
    if (!isLoading) {
      return postList.map(post => (
        <Post key={`post-${post.postId}`} post={post} />
      ));
    }
    return <p>Loading...</p>;
  };
  const makeCreatePostEditor = () => {
    if (isAuthenticated) {
      return <NewPost />;
    }
    return (
      <Link to='/login'>
        <Button
          variant='contained'
          className={classes.createButton}
          color='primary'
        >
          <AddIcon className={classes.extendedIcon} />
          Create Post
        </Button>
      </Link>
    );
  };
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {makeCreatePostEditor()}
        {makeRecentPostMarkup()}
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
  const isAuthenticated = !!state.user.authenticated;
  return {
    postList,
    isLoading,
    isAuthenticated,
  };
};

const mapActionsToProps = {
  getPostList,
  getUserDataAction,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(Home));
