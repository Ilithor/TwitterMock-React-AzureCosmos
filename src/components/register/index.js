import React from 'react';

// Components
import { RegisterForm } from './RegisterForm';

// MUI
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import AppIcon from '../../images/icon.png';

const useStyles = makeStyles({
  form: {
    textAlign: 'center',
  },
  image: {
    margin: 'auto',
    width: '76px',
    height: '76px',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
});

/** Control that allows the user to register
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
export const Register = ({
  error = {},
  handle,
  email,
  password,
  confirmPassword,
  handleSubmit,
  handleChange,
  isLoading,
}) => {
  const classes = useStyles();
  return (
    <Grid container className={classes?.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='eye' className={classes?.image} />
        <Typography variant='h2' className={classes?.pageTitle}>
          Register
        </Typography>
        <RegisterForm
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
