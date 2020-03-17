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
 * @returns {React.FunctionComponent}
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
    <CustomButton tip='Login' link={Link} to='/login'>
      <Icon.LockOpen />
    </CustomButton>
  );
};

/** Shows the settings button
 *
 * @returns {React.FunctionComponent}
 */
const ButtonSetting = () => {
  const { isAuthenticated } = useAuthenticationData();
  if (isAuthenticated) {
    return (
      <CustomButton tip='Settings' link={Link} to='/settings'>
        <Icon.Settings />
      </CustomButton>
    );
  }
  return <div />;
};

/** Displays either signup button or empty div
 *
 * @returns {React.FunctionComponent}
 */
const ButtonRegister = () => {
  const { isAuthenticated } = useAuthenticationData();
  if (isAuthenticated) {
    return <div />;
  }
  return (
    <CustomButton tip='Register' link={Link} to='/signup'>
      <Icon.Assignment />
    </CustomButton>
  );
};

/** Displays either notification button or empty div
 *
 * @returns {React.FunctionComponent}
 */
const ButtonNotification = () => {
  const { isAuthenticated } = useAuthenticationData();
  if (isAuthenticated) {
    return (
      <CustomButton tip='Notifications' link={Link} to='/notification'>
        <Icon.Notifications />
      </CustomButton>
    );
  }
  return <div />;
};

/** View component for navbar
 *
 * @returns {React.FunctionComponent}
 */
export const Navbar = () => (
  <AppBar>
    <Toolbar className='nav-container'>
      <CustomButton tip='Home' link={Link} to='/'>
        <Icon.Home />
      </CustomButton>
      <ButtonNotification />
      <ButtonSetting />
      <ButtonLogInOut />
      <ButtonRegister />
    </Toolbar>
  </AppBar>
);
