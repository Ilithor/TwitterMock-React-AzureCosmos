import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';

import LoginForm from '../components/LoginForm';
import style from '../style/style';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { loginUserAction } from '../redux/actions/userActions';

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: {},
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.UI.error) {
      this.setState({ error: nextProps.UI.error });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUserAction(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { isLoading },
    } = this.props;
    const { error } = this.state;
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
            isLoading={isLoading}
          />
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUserAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUserAction,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(login));
