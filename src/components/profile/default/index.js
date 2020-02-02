import React from 'react';

// Components
import { DefaultProfileButton } from './DefaultProfileButton';

// MUI
import { Paper, Typography } from '@material-ui/core';

/** View component for displaying the default profile view
 * @type {React.FunctionComponent}
 */
export const DefaultProfile = ({ classes }) => (
  <Paper className={classes?.paper}>
    <Typography varian='body2' align='center'>
      No profile found, please login
    </Typography>
    <DefaultProfileButton classes={classes} />
  </Paper>
);
