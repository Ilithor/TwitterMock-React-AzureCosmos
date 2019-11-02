import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';

import LoginForm from '../components/LoginForm';
import style from '../style/style';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { loginUser } from '../util/fetch';

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: {},
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    loginUser(userData)
      .then(res => {
        console.log(res.data);
        this.setState({
          isLoading: false,
        });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          error: err.response.data.error,
          isLoading: false,
        });
        console.log(this.state.error);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    const { error, isLoading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt='eye' className={classes.image} />
          <Typography variant='h2' className={classes.pageTitle}>
            Login
          </Typography>
          <LoginForm
            classes={classes}
            error={error}
            email={this.state.email}
            password={this.state.password}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            isLoading={this.state.isLoading}
          />
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(login);
