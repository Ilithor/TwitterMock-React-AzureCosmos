import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import Post from "../components/Post";
import { fetchPostList } from "../util/fetch";

export class home extends Component {
  state = {
    postList: null
  };

  componentDidMount() {
    fetchPostList().then(res => {
      this.setState({
        postList: res.data
      });
    });
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
