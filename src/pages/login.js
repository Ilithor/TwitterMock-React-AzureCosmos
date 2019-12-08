import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Login from '../components/login';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../style/style';

// Redux
import { connect } from 'react-redux';
import { loginUserAction } from '../redux/actions/userActions';

/**
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {any} props.classes
 * @param {any} props.UI
 * @param {Reac} props.history
 */
const LoginPage = ({ classes, UI, history }) => {
  const [error, setError] = useState({});
  const [editorState, setEditorState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = editorState;
  // equivalent to
  //   constructor() {
  //   super();
  //   this.state = {
  //     email: '',
  //     password: '',
  //     error: {},
  //   };
  // }

  useEffect(() => setError(UI.error), [UI.error]);
  // const componentDidUpdate = prevProps => {
  //   if (prevProps.UI.error !== this.props.UI.error) {
  //     setError(UI.error);
  //     // this.setState({ error: this.props.UI.error });
  //   }
  // };

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };
    this.props.loginUserAction(userData, history);
  };
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   const userData = {
  //     email: this.state.email,
  //     password: this.state.password,
  //   };
  //   this.props.loginUserAction(userData, this.props.history);
  // };

  const handleChange = event => {
    const { name, value } = event.target;
    setEditorState({
      ...editorState,
      [name]: value,
    });
  };
  // handleChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // };
  return (
    <Login
      classes={classes}
      error={error}
      email={email}
      password={password}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      isLoading={UI.isLoading}
    />
  );
};

// LoginPage.propTypes = {
//   classes: PropTypes.object.isRequired,
//   loginUserAction: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
//   UI: PropTypes.object.isRequired,
// };

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
)(withStyles(style)(LoginPage));
