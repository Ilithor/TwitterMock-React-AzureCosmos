import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

/** Various props that control how the user interacts with
 *  the login form
 * @type {React.FunctionComponent}
 * @param {ILoginFormComponentProps} props
 * @param {any} props.error
 * @param {object} props.classes
 * @param {string} props.email
 * @param {string} props.password
 * @param {React.ChangeEventHandler} props.handleSubmit
 * @param {React.ChangeEventHandler} props.handleChange
 * @param {boolean} props.isLoading
 */
export const LoginForm = ({
  handleSubmit,
  classes = {},
  error = {},
  email,
  handleChange,
  password,
  isLoading,
}) => (
  <form noValidate onSubmit={handleSubmit}>
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
      autoComplete='username'
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
      autoComplete='current-password'
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
      Login
      {isLoading && <CircularProgress size={30} className={classes.progress} />}
    </Button>
    <br />
    <small>
      Don't have an account? Sign up <Link to='/signup'>here</Link>
    </small>
  </form>
);

export default withStyles(style)(LoginForm);

/** Various props that control how the user interacts with
 *  the login form
 * @typedef ILoginFormComponentProps
 * @param {object} error
 * @param {object} classes
 * @param {string} email
 * @param {string} password
 * @param {React.ChangeEventHandler} handleSubmit
 * @param {React.ChangeEventHandler} handleChange
 * @param {boolean} isLoading
 */
