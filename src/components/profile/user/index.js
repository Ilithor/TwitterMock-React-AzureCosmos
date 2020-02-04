import React from 'react';

// Components
import { ProfileDetail } from './profile';

// MUI
import { Paper, CircularProgress } from '@material-ui/core';
import { useStyles } from '../profile.style';

// Context
import { useCurrentUserData } from '../userContext';

/** View component for displaying the user's profile
 *
 * @type {React.FunctionComponent}
 */
export const UserProfile = () => {
  const classes = useStyles();
  const { currentUser } = useCurrentUserData();
  if (currentUser?.userHandle || currentUser?.createdAt) {
    return <ProfileDetail classes={classes} />;
  }
  return (
    <Paper className={classes?.paper}>
      <div className={classes?.spinnerDiv}>
        <CircularProgress size={150} thickness={2} />
      </div>
    </Paper>
  );
};
