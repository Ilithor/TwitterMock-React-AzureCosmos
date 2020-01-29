import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// MUI
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Context
import { useUserRegisterData } from '../profile/userContext';

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

/** Displays the register form to the user
 * @type {React.FunctionComponent}
 */
export const RegisterForm = () => {
  const classes = useStyles();
  const { registerUser, userError, isLoadingRegister } = useUserRegisterData();
  const [editorState, setEditorState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
  });
  const { email, password, confirmPassword, handle } = editorState;

  const handleSubmit = event => {
    event.preventDefault();
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    registerUser(newUserData);
  };

  const handleChange = event => {
    const { name, value } = event?.target;
    setEditorState({
      ...editorState,
      [name]: value,
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        id='handle'
        name='handle'
        type='text'
        label='Handle'
        className={classes?.textField}
        helperText={userError?.handle}
        error={userError?.handle ? true : false}
        value={handle}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        id='email'
        name='email'
        type='email'
        label='Email'
        className={classes?.textField}
        helperText={userError?.email}
        error={userError?.email ? true : false}
        value={email}
        onChange={handleChange}
        autoComplete='off'
        fullWidth
      />
      <TextField
        id='password'
        name='password'
        type='password'
        label='Password'
        className={classes?.textField}
        helperText={userError?.password}
        error={userError?.password ? true : false}
        value={password}
        onChange={handleChange}
        autoComplete='new-password'
        fullWidth
      />
      <TextField
        id='confirmPassword'
        name='confirmPassword'
        type='password'
        label='Confirm Password'
        className={classes?.textField}
        helperText={userError?.confirmPassword}
        error={userError?.confirmPassword ? true : false}
        value={confirmPassword}
        onChange={handleChange}
        autoComplete='off'
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
        disabled={isLoadingRegister}
      >
        Register
        {isLoadingRegister && (
          <CircularProgress size={30} className={classes?.progress} />
        )}
      </Button>
      <br />
      <small>
        Already have an account? Login <Link to='/login'>here</Link>
      </small>
    </form>
  );
};
