import React, { useEffect } from 'react';

// Components
import { LoginForm } from '../components/login';

// MUI
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './page.style';

// Icons
import AppIcon from '../images/icon.png';

// Context
import { LoginProvider } from '../components/login/loginContext';
import { useHelmetData } from '../util/helmetContext';

/** Displays the login page
 *
 * @returns {React.FunctionComponent}
 */
export const LoginPage = () => {
  const classes = useStyles();
  const { setCurrentPage } = useHelmetData();
  useEffect(() => {
    setCurrentPage('Login');
  });
  return (
    <Grid container className={classes?.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='eye' className={classes?.image} />
        <Typography variant='h2' className={classes?.pageTitle}>
          Login
        </Typography>
        <LoginProvider>
          <LoginForm />
        </LoginProvider>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};
