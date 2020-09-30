import React from 'react';
import { useHistory } from 'react-router-dom';

// MUI
import { Button } from '@material-ui/core';
import { useStyles } from '../profile.style';

/** Displays the default buttons when no user found
 *
 * @returns {React.FunctionComponent}
 */
export const DefaultProfileButton = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes?.buttons}>
      <Button
        variant='contained'
        color='primary'
        onClick={() => history.push('/login')}
      >
        Login
      </Button>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => history.push('/signup')}
      >
        Register
      </Button>
    </div>
  );
};
