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

/** Control that allows the user to log in
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {any} props.error
 * @param {object} props.classes
 * @param {string} props.email
 * @param {string} props.password
 * @param {React.ChangeEventHandler} props.handleSubmit
 * @param {React.ChangeEventHandler} props.handleChange
 * @param {boolean} props.isLoading
 */
const Login = ({
  classes,
  error,
  email,
  password,
  handleSubmit,
  handleChange,
  isLoading,
}) => (
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

export default withStyles(style)(Login);
