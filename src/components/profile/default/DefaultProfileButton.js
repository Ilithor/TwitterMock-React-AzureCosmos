import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
});

/** Displays the default buttons when no user found
 * @type {React.FunctionComponent}
 */
export const DefaultProfileButton = () => {
  const classes = useStyles();
  return (
    <div className={classes?.buttons}>
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
