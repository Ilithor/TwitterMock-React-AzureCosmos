import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

// Components
import Post from '../components/post';
import Profile from '../components/profile';

// Redux
import { connect } from 'react-redux';
import { getPostList } from '../redux/actions/dataActions';

export class home extends Component {
  componentDidMount() {
    this.props.getPostList();
  }
  render() {
    const { postList, isLoading } = this.props.data;
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
  }
}

home.propTypes = {
  getPostList: PropTypes.func,
  data: PropTypes.object,
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(
  mapStateToProps,
  { getPostList }
)(home);
