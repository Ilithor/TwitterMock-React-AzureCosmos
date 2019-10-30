import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Post from '../components/Post';

export class home extends Component {
  state = {
    postList: null
  };

  componentDidMount() {
    axios
      .get('/api/post')
      .then(res => {
        console.log(res.data);
        this.setState({
          postList: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentPostMarkup = this.state.postList ? (
      this.state.postList.map(post => <Post post={post} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentPostMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
