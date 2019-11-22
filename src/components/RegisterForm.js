import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from '../style/style';

// MUI
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// This component uses React Hooks, which are a new way of writing components that
// simplifies component writing syntax a little bit and results in components that
// are easier to read and also simplifies state management. for more info read:
// https://reactjs.org/docs/hooks-intro.html

/** Form that allows a new user to enter info and register themself
 * @param props
 */
const RegisterForm = props => {
  //notice the 1 fewer level of indents because this is a function not a class
  //notice that I spread the props at the beginning rather than this.props everywhere
  const {
    handle,
    handleChange,
    handleSubmit,
    error,
    email,
    classes,
    password,
    confirmPassword,
    isLoading,
  } = props;

  //notice that there's no need for any render stuff, just return our UI directly
  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        id='handle'
        name='handle'
        type='text'
        label='Handle'
        className={classes.textField}
        helperText={error && error.handle}
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
        {isLoading && (
          <CircularProgress size={30} className={classes.progress} />
        )}
      </Button>
      <br />
      <small>
        Already have an account? Login <Link to='/login'>here</Link>
      </small>
    </form>
  );
};

RegisterForm.propTypes = {
  handle: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  error: PropTypes.object,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  isLoading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(RegisterForm);
