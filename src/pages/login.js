import React, { useState, useEffect } from 'react';

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
 * @param {object} props.classes
 * @param {any} props.UI
 * @param {Reac} props.history
 */
const LoginPage = ({ classes, UI, history, loginUserAction }) => {
  const [error, setError] = useState({});
  const [editorState, setEditorState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = editorState;

  useEffect(() => setError(UI.error), [UI.error]);

  /** Try to log the user in with the current data
   *
   * @param {React.ChangeEvent} event
   */
  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };
    loginUserAction(userData, history);
  };

  /** Saves editor change to local state
   *
   * @param {React.ChangeEvent} event
   */
  const handleChange = event => {
    const { name, value } = event.target;
    setEditorState({
      ...editorState,
      [name]: value,
    });
  };
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

const mapStateToProps = state => {
  const user = state.user;
  const UI = state.UI;
  return {
    user,
    UI,
  };
};

export default connect(
  mapStateToProps,
  { loginUserAction }
)(withStyles(style)(LoginPage));
