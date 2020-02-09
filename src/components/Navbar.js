import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { CustomButton } from '../util/CustomButton';

// MUI
import { AppBar, Toolbar } from '@material-ui/core';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useAuthenticationData } from './profile/authenticationContext';
import { useLogoutData } from './login/logoutContext';

/** Shows the log in or log out button
 *
 * @type {React.FunctionComponent}
 */
const ButtonLogInOut = () => {
  const { isAuthenticated } = useAuthenticationData();
  const { logoutUser } = useLogoutData();
  if (isAuthenticated) {
    return (
      <CustomButton tip='Logout' onClick={logoutUser}>
        <Icon.KeyboardReturn />
      </CustomButton>
    );
  }
  return (
    <CustomButton tip='Login' component={Link} to='/login'>
      <Icon.LockOpen />
    </CustomButton>
  );
};

const ButtonSetting = () => {
  const { isAuthenticated } = useAuthenticationData();
  if (isAuthenticated) {
    return (
      <CustomButton tip='Settings' component={Link} to='/settings'>
        <Icon.Settings />
      </CustomButton>
    );
  }
  return <div />;
};

/** Displays either signup button or empty div
 *
 * @type {React.FunctionComponent}
 */
const ButtonRegister = () => {
  const { isAuthenticated } = useAuthenticationData();
  if (isAuthenticated) {
    return <div />;
  }
  return (
    <CustomButton tip='Register' component={Link} to='/signup'>
      <Icon.Assignment />
    </CustomButton>
  );
};

/** Displays either notification button or empty div
 *
 * @type {React.FunctionComponent}
 */
const ButtonNotification = () => {
  const { isAuthenticated } = useAuthenticationData();
  if (isAuthenticated) {
    return (
      <CustomButton tip='Notifications' component={Link} to='/notification'>
        <Icon.Notifications />
      </CustomButton>
    );
  }
  return <div />;
};

/** View component for navbar
 *
 * @type {React.FunctionComponent}
 */
export const Navbar = () => (
  <AppBar>
    <Toolbar className='nav-container'>
      <CustomButton tip='Home' component={Link} to='/'>
        <Icon.Home />
      </CustomButton>
      <ButtonNotification />
      <ButtonSetting />
      <ButtonLogInOut />
      <ButtonRegister />
    </Toolbar>
  </AppBar>
);
