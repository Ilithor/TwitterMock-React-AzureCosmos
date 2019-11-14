import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../style/style';

// MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class DefaultProfileDisplay extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography varian='body2' align='center'>
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/login'
          >
            Login
          </Button>
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to='/signup'
          >
            Register
          </Button>
        </div>
      </Paper>
    );
  }
}

DefaultProfileDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DefaultProfileDisplay);
