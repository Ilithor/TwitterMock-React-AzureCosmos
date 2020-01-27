import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// MUI
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Context
import { useUserLoginData } from '../context/userContext';

const useStyles = makeStyles({
  textField: {
    margin: '10px auto 10px auto',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  button: {
    marginTop: '20',
    position: 'relative',
  },
  progress: {
    position: 'absolute',
  },
});

/** View component for displaying the login form to the user
 * @type {ILoginFormComponentProps}
 */
export const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { loginUser, userError, isLoadingLogin } = useUserLoginData();
  const [error, setError] = useState({});
  const [editorState, setEditorState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = editorState;

  useEffect(() => setError(userError), [userError]);

  const handleSubmit = event => {
    if (!isLoadingLogin) {
      event.preventDefault();
      const userParam = {
        email,
        password,
      };
      loginUser(userParam).then(() => {
        history.push('/');
      });
    }
  };
  const handleChange = event => {
    const { name, value } = event.target;
    setEditorState({
      ...editorState,
      [name]: value,
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        id='email'
        name='email'
        type='email'
        label='Email'
        className={classes?.textField}
        helperText={error?.email}
        error={error?.email ? true : false}
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
        helperText={error?.password}
        error={error?.password ? true : false}
        value={password}
        onChange={handleChange}
        autoComplete='current-password'
        fullWidth
      />
      {error?.general && (
        <Typography variant='body2' className={classes?.customError}>
          {error?.general}
        </Typography>
      )}
      <Button
        type='submit'
        variant='contained'
        color='primary'
        className={classes?.button}
        disabled={!!isLoadingLogin}
      >
        Login
        {!!isLoadingLogin && (
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
