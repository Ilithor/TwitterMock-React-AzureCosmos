import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import DefaultProfileButtons from './DefaultProfileButtons';

// MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

/** View component for displaying the default profile view
 * @param {IDefaultProfileDisplayComponentProps} props
 */
class DefaultProfileDisplay extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography varian='body2' align='center'>
          No profile found, please login again
        </Typography>
        <DefaultProfileButtons classes={classes} />
      </Paper>
    );
  }
}

DefaultProfileDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DefaultProfileDisplay);

/** Props passed to the DefaultProfileDisplay view component
 * @typedef IDefaultProfileDisplayComponentProps
 * @property {object} classes
 */
