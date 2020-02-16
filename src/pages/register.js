import React, { useEffect } from 'react';

// Components
import { RegisterForm } from '../components/register';

// MUI
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './page.style';

// Icons
import AppIcon from '../images/icon.png';

// Context
import { RegisterProvider } from '../components/register/registerContext';
import { useHelmetData } from '../util/helmetContext';

/** Control that allows the user to register
 *
 * @returns {React.ReactElement}
 */
export const RegisterPage = () => {
  const classes = useStyles();
  const { setCurrentPage } = useHelmetData();
  useEffect(() => {
    setCurrentPage('Register');
  });
  return (
    <Grid container className={classes?.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='eye' className={classes?.image} />
        <Typography variant='h2' className={classes?.pageTitle}>
          Register
        </Typography>
        <RegisterProvider>
          <RegisterForm />
        </RegisterProvider>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};
