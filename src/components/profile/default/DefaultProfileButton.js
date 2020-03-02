import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { Button } from '@material-ui/core';
import { useStyles } from '../profile.style';

/** Displays the default buttons when no user found
 *
 * @returns {React.FunctionComponent}
 */
export const DefaultProfileButton = () => {
  const classes = useStyles();
  return (
    <div className={classes?.buttons}>
      <Button variant='contained' color='primary' link={Link} to='/login'>
        Login
      </Button>
      <Button variant='contained' color='secondary' link={Link} to='/signup'>
        Register
      </Button>
    </div>
  );
};
