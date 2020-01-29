import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { CustomButton } from '../util/CustomButton';

// MUI
import { AppBar, Toolbar } from '@material-ui/core';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import {
  useUserAuthenticationData,
  useUserLogout,
} from './profile/userContext';

/** Shows the log in or log out button
 * @param {object} props
 * @param {boolean} props.isAuthenticated
 * @param {any} props.logoutUser
 */
const ButtonLogInOut = ({ isAuthenticated, logoutUser }) => {
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

/** Displays either signup button or empty div
 * @param {object} props
 * @param {boolean} props.isAuthenticated
 */
const ButtonRegister = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <div></div>;
  }
  return (
    <CustomButton tip='Register' component={Link} to='/signup'>
      <Icon.Assignment />
    </CustomButton>
  );
};

/** Displays either notification button or empty div
 * @param {object} props
 * @param {boolean} props.isAuthenticated
 */
const ButtonNotification = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <CustomButton tip='Notifications' component={Link} to='/notification'>
        <Icon.Notifications />
      </CustomButton>
    );
  }
  return <div></div>;
};

/** View component for navbar
 */
export const Navbar = () => {
  const { isAuthenticated } = useUserAuthenticationData();
  const { logoutUser } = useUserLogout();
  return (
    <AppBar>
      <Toolbar className='nav-container'>
        <CustomButton tip='Home' component={Link} to='/'>
          <Icon.Home />
        </CustomButton>
        <ButtonNotification isAuthenticated={isAuthenticated} />
        <ButtonLogInOut
          isAuthenticated={isAuthenticated}
          logoutUser={logoutUser}
        />
        <ButtonRegister isAuthenticated={isAuthenticated} />
      </Toolbar>
    </AppBar>
  );
};
