import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

const DefaultProfileButtons = props => {
  const { classes } = props;
  return (
    <div className={classes.buttons}>
      <Button variant='contained' color='primary' component={Link} to='/login'>
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
  );
};

DefaultProfileButtons.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(DefaultProfileButtons);
