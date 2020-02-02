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
import { useUserLoginData } from '../profile/userContext';
import { useLoginValidationData } from './loginContext';

/** View component for displaying the login form to the user
 * @type {ILoginFormComponentProps}
 */
export const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    loginUser,
    userError,
    isLoadingLogin,
    setUserError,
  } = useUserLoginData();
  const { validationCheckLogin, loginError } = useLoginValidationData();
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
          console.log(userError, loginError);
          if (!userError && Object.keys(loginError).length === 0) {
            history.push('/');
          }
        })
        .catch(err => {
          console.error(err);
          setUserError(err);
        });
    }
  };

  const handleChange = event => {
    if (userError) {
      setUserError();
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
        helperText={loginError?.email || userError?.email}
        error={
          loginError?.email ? true : false || userError?.email ? true : false
        }
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
        helperText={loginError?.password || userError?.password}
        error={
          loginError?.password
            ? true
            : false || userError?.password
            ? true
            : false
        }
        value={password}
        onChange={handleChange}
        autoComplete='current-password'
        fullWidth
      />
      {userError?.general && (
        <Typography variant='body2' className={classes?.customError}>
          {userError?.general}
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
/** Various props that control how the user interacts with
 *  the login form
 * @typedef ILoginFormComponentProps
 */
