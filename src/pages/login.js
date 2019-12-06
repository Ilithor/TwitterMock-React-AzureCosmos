import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Login from '../components/login';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../style/style';

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

  componentDidUpdate = prevProps => {
    if (prevProps.UI.error !== this.props.UI.error) {
      this.setState({ error: this.props.UI.error });
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
      <Login
        classes={classes}
        error={error}
        email={this.state.email}
        password={this.state.password}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        isLoading={isLoading}
      />
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
