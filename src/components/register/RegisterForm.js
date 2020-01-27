import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
 * @param {object} props
 * @param {object} props.error
 * @param {string} props.handle
 * @param {string} props.email
 * @param {string} props.password
 * @param {string} props.confirmPassword
 * @param {boolean} props.isLoading
 * @param {React.ChangeEventHandler} props.handleSubmit
 * @param {React.ChangeEventHandler} props.handleChange
 */
export const RegisterForm = ({
  error = {},
  handle,
  email,
  password,
  confirmPassword,
  isLoading,
  handleSubmit,
  handleChange,
}) => {
  const classes = useStyles();
  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        id='handle'
        name='handle'
        type='text'
        label='Handle'
        className={classes?.textField}
        helperText={error?.handle}
        error={error?.handle ? true : false}
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
        helperText={error?.email}
        error={error?.email ? true : false}
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
        helperText={error?.password}
        error={error?.password ? true : false}
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
        helperText={error?.confirmPassword}
        error={error?.confirmPassword ? true : false}
        value={confirmPassword}
        onChange={handleChange}
        autoComplete='off'
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
        disabled={isLoading}
      >
        Register
        {isLoading && (
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
