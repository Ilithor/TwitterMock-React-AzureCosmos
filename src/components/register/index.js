import React from 'react';
import AppIcon from '../../images/icon.png';

// Components
import RegisterForm from './RegisterForm';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/** Control that allows the user to register
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
const Register = ({
  classes,
  error,
  handle,
  email,
  password,
  confirmPassword,
  handleSubmit,
  handleChange,
  isLoading,
}) => {
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='eye' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Register
        </Typography>
        <RegisterForm
          classes={classes}
          error={error}
          handle={handle}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Register;
