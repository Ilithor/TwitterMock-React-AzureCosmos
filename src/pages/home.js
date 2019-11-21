import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Post from '../components/Post';
import Profile from '../components/Profile';

import { connect } from 'react-redux';
import { getPostList } from '../redux/actions/dataActions';

export class home extends Component {
  componentDidMount() {
    this.props.getPostList();
  }

  render() {
    const { postList, isLoading } = this.props.data;
    let recentPostMarkup = !isLoading ? (
      postList.map(post => <Post key={post.postId} post={post} />)
    ) : (
      <p>Loading...</p>
    );
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
  }
}

home.propTypes = {
  getPostList: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(
  mapStateToProps,
  { getPostList }
)(home);
