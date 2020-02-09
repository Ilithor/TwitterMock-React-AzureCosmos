import React from 'react';
import defaultImage from '../../../images/user.png';

// Components
import { ProfileDetail } from './ProfileDetail';

// MUI
import { Paper, CircularProgress } from '@material-ui/core';
import { useStyles } from '../profile.style';

// Context
import { useUserListData } from '../user/userListContext';

/** Displays the profile of the selected user
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.user
 */
export const StaticProfile = ({ user }) => {
  const classes = useStyles();
  const { isLoadingUserList } = useUserListData();
  if (!isLoadingUserList && user) {
    const { userImage } = user;
    return (
      <Paper className={classes?.paper}>
        <div className={classes?.profile}>
          <div className='image-wrapper'>
            <img
              src={userImage ? userImage : defaultImage}
              alt='profile'
              className='profile-image'
            />
          </div>
          <hr />
          <ProfileDetail user={user} />
        </div>
      </Paper>
    );
  }
  return (
    <div className={classes?.spinnerDiv}>
      <CircularProgress size={150} thickness={2} />
    </div>
  );
};
