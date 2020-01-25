import React from 'react';

// Components
import { DefaultProfileButton } from './DefaultProfileButton';

// MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style';

/** View component for displaying the default profile view
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 */
const DefaultProfileDisplayView = ({ classes = {} }) => {
  return (
    <Paper className={classes.paper}>
      <Typography varian='body2' align='center'>
        No profile found, please login again
      </Typography>
      <DefaultProfileButton classes={classes} />
    </Paper>
  );
};

export const DefaultProfileDisplay = withStyles(style)(
  DefaultProfileDisplayView
);
