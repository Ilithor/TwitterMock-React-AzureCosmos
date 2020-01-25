import React from 'react';
import { Link } from 'react-router-dom';

// Components
import CustomButton from '../util/CustomButton';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as Icon from '@material-ui/icons';

// Redux
import { connect } from 'react-redux';
import { logoutUserAction } from '../redux/actions/userActions';

/** Shows the log in or log out button
 * @param {object} props
 * @param {boolean} props.isLoggedIn
 * @param {any} props.logout
 */
const ButtonLogInOut = ({ isLoggedIn, logout }) => {
  if (isLoggedIn) {
    return (
      <CustomButton tip='Logout' onClick={logout}>
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
 * @param {boolean} props.isLoggedIn
 */
const ButtonRegister = ({ isLoggedIn }) => {
  if (isLoggedIn) {
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
 * @param {boolean} props.isLoggedIn
 */
const ButtonNotification = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <CustomButton tip='Notifications' component={Link} to='/notification'>
        <Icon.Notifications />
      </CustomButton>
    );
  }
  return <div></div>;
};

/** View component for navbar
 * @param {object} props
 * @param {boolean} props.isLoggedIn
 * @param {any} props.logoutUserAction
 */
const NavbarView = ({ isLoggedIn = false, logoutUserAction }) => (
  <AppBar>
    <Toolbar className='nav-container'>
      <CustomButton tip='Home' component={Link} to='/'>
        <Icon.Home />
      </CustomButton>
      <ButtonNotification isLoggedIn={isLoggedIn} />
      <ButtonLogInOut isLoggedIn={isLoggedIn} logout={logoutUserAction} />
      <ButtonRegister isLoggedIn={isLoggedIn} />
    </Toolbar>
  </AppBar>
);

const mapStateToProps = ({ user }) => {
  const isLoggedIn = !!user && !!user.userInfo && !!user.userInfo.handle;
  return {
    isLoggedIn,
  };
};

const mapActionsToProps = {
  logoutUserAction,
};

export const Navbar = connect(
  mapStateToProps,
  mapActionsToProps
)(NavbarView);
