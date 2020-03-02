import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// MUI
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useStyles } from './login.style';

// Context
import { useLoginData, useLoginValidationData } from './loginContext';

/** View component for displaying the login form to the user
 *
 * @returns {React.FunctionComponent}
 */
export const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    loginUser,
    loginError,
    isLoadingLogin,
    setLoginError,
  } = useLoginData();
  const { validationCheckLogin } = useLoginValidationData();
  const [editorState, setEditorState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = editorState;

  const handleSubmit = event => {
    if (!isLoadingLogin) {
      event.preventDefault();
      const userParam = {
        email,
        password,
      };
      loginUser(userParam)
        .then(() => {
          if (Object.keys(loginError).length === 0) {
            history.push('/');
          }
        })
        .catch(err => {
          console.error(err);
          setLoginError(err);
        });
    }
  };

  const handleChange = event => {
    if (loginError) {
      setLoginError();
    }
    const { name, value } = event.target;
    setEditorState(validationCheckLogin({ ...editorState, [name]: value }));
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        id='email'
        name='email'
        type='email'
        label='Email'
        className={classes?.textField}
        helperText={loginError?.email}
        error={loginError?.email ? true : false}
        value={email}
        onChange={handleChange}
        autoComplete='username'
        fullWidth
      />
      <TextField
        id='password'
        name='password'
        type='password'
        label='Password'
        className={classes?.textField}
        helperText={loginError?.password}
        error={loginError?.password ? true : false}
        value={password}
        onChange={handleChange}
        autoComplete='current-password'
        fullWidth
      />
      {loginError?.general && (
        <Typography variant='body2' className={classes?.customError}>
          {loginError?.general}
        </Typography>
      )}
      <Button
        type='submit'
        variant='contained'
        color='primary'
        className={classes?.button}
        disabled={isLoadingLogin}
      >
        Login
        {isLoadingLogin && (
          <CircularProgress size={30} className={classes?.progress} />
        )}
      </Button>
      <br />
      <small>
        Don't have an account? Sign up <Link to='/signup'>here</Link>
      </small>
    </form>
  );
};
