import React from 'react';

// Components
import { DefaultProfileButton } from './DefaultProfileButton';

// MUI
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    padding: 20,
  },
});

/** View component for displaying the default profile view
 * @type {React.FunctionComponent}
 */
export const DefaultProfileDisplay = () => {
  const classes = useStyles();
  return (
    <Paper className={classes?.paper}>
      <Typography varian='body2' align='center'>
        No profile found, please login again
      </Typography>
      <DefaultProfileButton />
    </Paper>
  );
};
