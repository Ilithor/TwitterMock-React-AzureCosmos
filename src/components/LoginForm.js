import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from '../style/style';

// MUI
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

/** View component for displaying a login form on the site
 * @param {ILoginFormComponentProps} props
 */
class LoginForm extends Component {
  render() {
    const {
      classes,
      handleSubmit,
      error,
      email,
      handleChange,
      password,
      isLoading,
    } = this.props;
    return (
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
          {isLoading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
        </Button>
        <br />
        <small>
          Don't have an account? Sign up <Link to='/signup'>here</Link>
        </small>
      </form>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

/** Component representing a login form on the page.
 * @param {{loginForm:ILoginForm}} props
 */
export default withStyles(style)(LoginForm);

/** Props passed to the LoginForm view component
 * @typedef ILoginFormComponentProps
 * @property {object} classes
 * @property {function} handleSubmit
 * @property {string} error
 * @property {string} email
 * @property {function} handleChange
 * @property {string} password
 * @property {boolean} isLoading
 */

 /** Props that represent a login form being rendered.
 * @typedef ILoginForm
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 */
