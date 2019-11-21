import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUserAction } from '../redux/actions/userActions';
import PropTypes from 'prop-types';
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

/** Shows the log in or log out button
 * @param {{isLoggedIn:boolean, logout:()=>void}} props
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

ButtonLogInOut.propTypes = {
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

/** Displays either signup button or empty div
 * @param {{isLoggedIn:boolean}} props
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

ButtonRegister.propTypes = {
  isLoggedIn: PropTypes.bool,
};

/** Displays either create new post button or empty div
 * @param {{isLoggedIn:boolean}} props
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

ButtonPost.propTypes = {
  isLoggedIn: PropTypes.bool,
};

/** Displays either notification button or empty div
 * @param {{isLoggedIn:boolean}} props
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

ButtonNotification.propTypes = {
  isLoggedIn: PropTypes.bool,
};

/** View component for navbar
 * @param {{isLoggedIn:bool, logoutUserAction:()=>void}} props
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
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  logoutUserAction: PropTypes.func,
};

const mapStateToProps = ({ user }) => ({
  isLoggedIn: !!user.userInfo && !!user.userInfo.handle,
});

const mapActionsToProps = {
  logoutUserAction,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);
