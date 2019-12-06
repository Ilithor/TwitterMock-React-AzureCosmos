import React from 'react';
import AppIcon from '../../images/icon.png';

// Components
import RegisterForm from './RegisterForm';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Register = props => {
  const {
    classes,
    error,
    handle,
    email,
    password,
    confirmPassword,
    handleSubmit,
    handleChange,
    isLoading,
  } = props;
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
