import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import style from '../style/style';

// Component
import RegisterForm from '../components/RegisterForm';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { registerUserAction } from '../redux/actions/userActions';

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      error: {},
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.UI.error !== this.props.UI.error) {
      this.setState({ error: this.props.UI.error });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.registerUserAction(newUserData, this.props.history);
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
            isLoading={isLoading}
          />
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  registerUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

export default connect(
  mapStateToProps,
  { registerUserAction }
)(withStyles(style)(signup));
