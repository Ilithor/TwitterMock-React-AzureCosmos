import React from 'react';

// Components
import { LoginForm } from './LoginForm';

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

/** Control that allows the user to log in
 * @type {React.FunctionComponent}
 */
export const Login = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes?.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='eye' className={classes?.image} />
        <Typography variant='h2' className={classes?.pageTitle}>
          Login
        </Typography>
        <LoginForm />
      </Grid>
      <Grid item sm />
    </Grid>
  );
};
