import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';

import RegisterForm from '../components/RegisterForm';
import style from '../style/style';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { registerUser } from '../util/fetch';

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
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
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    registerUser(userData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('Token', `Bearer ${res.data.token}`);
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
            Register
          </Typography>
          <RegisterForm
            classes={classes}
            error={error}
            handle={this.state.handle}
            email={this.state.email}
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}
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

signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(signup);
