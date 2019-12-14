import React from 'react';

// Components
import DefaultProfileButtons from './DefaultProfileButtons';

// MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

/** View component for displaying the default profile view
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 */
const DefaultProfileDisplay = ({ classes = {} }) => {
  return (
    <Paper className={classes.paper}>
      <Typography varian='body2' align='center'>
        No profile found, please login again
      </Typography>
      <DefaultProfileButtons classes={classes} />
    </Paper>
  );
};

export default withStyles(style)(DefaultProfileDisplay);
