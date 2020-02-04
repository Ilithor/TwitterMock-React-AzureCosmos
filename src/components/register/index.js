import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// MUI
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useStyles } from './register.style';

// Context
import { useUserRegisterData } from '../profile/userContext';
import { useRegisterValidationData } from './registerContext';

/** Displays the register form to the user
 * 
 * @type {React.FunctionComponent}
 */
export const RegisterForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    registerUser,
    userError,
    setUserError,
    isLoadingRegister,
  } = useUserRegisterData();
  const {
    validationCheckRegister,
    registerError,
  } = useRegisterValidationData();
  const [editorState, setEditorState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userHandle: '',
  });
  const { email, password, confirmPassword, userHandle } = editorState;

  const handleSubmit = event => {
    if (!isLoadingRegister) {
      event.preventDefault();
      const newUserData = {
        email,
        password,
        confirmPassword,
        userHandle,
      };
      registerUser(newUserData)
        .then(() => {
          if (!userError && Object.keys(registerError).length === 0) {
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
    const { name, value } = event?.target;
    setEditorState(validationCheckRegister({ ...editorState, [name]: value }));
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        id='userHandle'
        name='userHandle'
        type='text'
        label='Username'
        className={classes?.textField}
        helperText={registerError?.userHandle || userError?.userHandle}
        error={
          registerError?.userHandle
            ? true
            : false || userError?.userHandle
            ? true
            : false
        }
        value={userHandle}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        id='email'
        name='email'
        type='email'
        label='Email'
        className={classes?.textField}
        helperText={registerError?.email || userError?.email}
        error={
          registerError?.email ? true : false || userError?.email ? true : false
        }
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
        helperText={registerError?.password || userError?.password}
        error={
          registerError?.password
            ? true
            : false || userError?.password
            ? true
            : false
        }
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
        helperText={
          registerError?.confirmPassword || userError?.confirmPassword
        }
        error={
          registerError?.confirmPassword
            ? true
            : false || userError?.confirmPassword
            ? true
            : false
        }
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
