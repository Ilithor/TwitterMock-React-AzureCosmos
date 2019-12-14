import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

/** Displays the register form to the user
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {object} props.error
 * @param {string} props.handle
 * @param {string} props.email
 * @param {string} props.password
 * @param {string} props.confirmPassword
 * @param {boolean} props.isLoading
 * @param {React.ChangeEventHandler} props.handleSubmit
 * @param {React.ChangeEventHandler} props.handleChange
 */
const RegisterForm = ({
  classes = {},
  error = {},
  handle,
  email,
  password,
  confirmPassword,
  isLoading,
  handleSubmit,
  handleChange,
}) => (
  <form noValidate onSubmit={handleSubmit}>
    <TextField
      id='handle'
      name='handle'
      type='text'
      label='Handle'
      className={classes.textField}
      helperText={error.handle}
      error={error.handle ? true : false}
      value={handle}
      onChange={handleChange}
      fullWidth
    />
    <TextField
      id='email'
      name='email'
      type='email'
      label='Email'
      className={classes.textField}
      helperText={error.email}
      error={error.email ? true : false}
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
      className={classes.textField}
      helperText={error.password}
      error={error.password ? true : false}
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
      className={classes.textField}
      helperText={error.confirmPassword}
      error={error.confirmPassword ? true : false}
      value={confirmPassword}
      onChange={handleChange}
      autoComplete='off'
      fullWidth
    />
    {error.general && (
      <Typography variant='body2' className={classes.customError}>
        {error.general}
      </Typography>
    )}
    <Button
      type='submit'
      variant='contained'
      color='primary'
      className={classes.button}
      disabled={isLoading}
    >
      Register
      {isLoading && <CircularProgress size={30} className={classes.progress} />}
    </Button>
    <br />
    <small>
      Already have an account? Login <Link to='/login'>here</Link>
    </small>
  </form>
);

export default withStyles(style)(RegisterForm);
