import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style';

/** Displays the default buttons when no user found
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 */
const DefaultProfileButtons = ({ classes = {} }) => {
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

export default withStyles(style)(DefaultProfileButtons);
