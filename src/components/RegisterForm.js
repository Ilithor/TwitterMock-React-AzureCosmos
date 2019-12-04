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

/** View component for displaying an individual post on the site
 * @param {IRegisterFormComponentProps} props
 */
class RegisterForm extends Component {
  render() {
    const {
      classes,
      handleSubmit,
      error,
      handle,
      handleChange,
      email,
      password,
      confirmPassword,
      isLoading,
    } = this.props;
    return (
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
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

/** Component representing an individual post on the page.
 * @param {{registerForm:IRegisterForm}} props
 */
export default withStyles(style)(RegisterForm);

/** Props passed to the RegisterForm view component
 * @typedef IRegisterFormComponentProps
 * @property {object} classes
 * @property {function} handleSubmit
 * @property {object} error
 * @property {string} handle
 * @property {function} handleChange
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 * @property {boolean} isLoading
 */

 /** Props that represent a register form being rendered.
 * @typedef IRegisterForm
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 */
