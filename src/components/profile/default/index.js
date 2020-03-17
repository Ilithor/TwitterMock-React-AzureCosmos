import React from 'react';

// Components
import { DefaultProfileButton } from './DefaultProfileButton';

// MUI
import { Paper, Typography } from '@material-ui/core';
import { useStyles } from '../profile.style';

/** View component for displaying the default profile view
 *
 * @returns {React.FunctionComponent}
 */
export const DefaultProfile = () => {
  const classes = useStyles();
  return (
    <Paper className={classes?.paper}>
      <Typography varian='body2' align='center'>
        No profile found, please login
      </Typography>
      <DefaultProfileButton classes={classes} />
    </Paper>
  );
};
