import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component
import Register from '../components/register';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../style/style';

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
      <Register
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
