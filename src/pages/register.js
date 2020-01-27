import React, { useState, useEffect } from 'react';

// Component
import { Register } from '../components/register';

// Redux
import { connect } from 'react-redux';
import { registerUserAction } from '../redux/actions/userActions';

/**
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {any} props.UI
 * @param {Reac} props.history
 */
const RegisterPageView = ({ UI = {}, history, registerUserAction }) => {
  const [error, setError] = useState({});
  const [editorState, setEditorState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
  });
  const { email, password, confirmPassword, handle } = editorState;

  useEffect(() => setError(UI.error), [UI.error]);

  const handleSubmit = event => {
    event.preventDefault();
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    registerUserAction(newUserData, history);
  };

  const handleChange = event => {
    const { name, value } = event?.target;
    setEditorState({
      ...editorState,
      [name]: value,
    });
  };
  return (
    <Register
      error={error}
      handle={handle}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      isLoading={UI?.isLoading}
    />
  );
};

const mapStateToProps = ({ UI }) => ({ UI });

export const RegisterPage = connect(
  mapStateToProps,
  { registerUserAction }
)(RegisterPageView);
