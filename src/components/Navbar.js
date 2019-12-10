import React from 'react';
import { Link } from 'react-router-dom';

// Components
import CustomButton from '../util/CustomButton';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AssignmentIcon from '@material-ui/icons/Assignment';

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
        <KeyboardReturn />
      </CustomButton>
    );
  }
  return (
    <Link to='/login'>
      <CustomButton tip='Login'>
        <LockOpenIcon />
      </CustomButton>
    </Link>
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
    <Link to='/signup'>
      <CustomButton tip='Register'>
        <AssignmentIcon />
      </CustomButton>
    </Link>
  );
};

/** Displays either create new post button or empty div
 * @param {object} props
 * @param {boolean} props.isLoggedIn
 */
const ButtonPost = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <CustomButton tip='New Post'>
        <AddIcon />
      </CustomButton>
    );
  }
  return <div></div>;
};

/** Displays either notification button or empty div
 * @param {object} props
 * @param {boolean} props.isLoggedIn
 */
const ButtonNotification = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <CustomButton tip='Notifications'>
        <Notifications />
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
const Navbar = ({ isLoggedIn = false, logoutUserAction }) => (
  <AppBar>
    <Toolbar className='nav-container'>
      <Link to='/'>
        <CustomButton tip='Home'>
          <HomeIcon />
        </CustomButton>
      </Link>
      <ButtonPost isLoggedIn={isLoggedIn} />
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);
