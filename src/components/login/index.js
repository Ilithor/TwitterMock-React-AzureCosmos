import React from 'react';

// Components
import LoginForm from './LoginForm';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

// Icons
import AppIcon from '../../images/icon.png';

const Login = props => {
  const {
    classes,
    error,
    email,
    password,
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
          Login
        </Typography>
        <LoginForm
          classes={classes}
          error={error}
          email={email}
          password={password}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withStyles(style)(Login);
