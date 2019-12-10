import React from 'react';

// Components
import UserProfileDisplay from './user';
import DefaultProfileDisplay from './default';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

// Redux
import { connect } from 'react-redux';

/** View component for displaying either the default or user profile
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {boolean} props.user.isLoading
 * @param {boolean} props.user.authenticated
 */
const Profile = ({ classes, user: { isLoading, authenticated } }) => {
  let profileMarkup;
  if (!isLoading) {
    if (authenticated) {
      profileMarkup = <UserProfileDisplay classes={classes} />;
    } else {
      profileMarkup = <DefaultProfileDisplay classes={classes} />;
    }
  } else {
    profileMarkup = <p>loading...</p>;
  }
  return profileMarkup;
};

const mapStateToProps = state => {
  const user = state.user;
  return {
    user,
  };
};

export default connect(mapStateToProps)(withStyles(style)(Profile));
