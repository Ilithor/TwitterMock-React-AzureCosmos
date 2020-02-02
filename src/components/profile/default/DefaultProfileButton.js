import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { Button } from '@material-ui/core';

/** Displays the default buttons when no user found
 * @type {React.FunctionComponent}
 */
export const DefaultProfileButton = ({ classes }) => (
  <div className={classes?.buttons}>
    <Button variant='contained' color='primary' component={Link} to='/login'>
      Login
    </Button>
    <Button variant='contained' color='secondary' component={Link} to='/signup'>
      Register
    </Button>
  </div>
);
