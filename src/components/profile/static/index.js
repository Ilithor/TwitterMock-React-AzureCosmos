import React from 'react';

// Components
import { ProfileDetail } from './ProfileDetail';

// MUI
import { Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 'auto',
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
}));

export const StaticProfile = ({ profile }) => {
  const classes = useStyles();
  if (!profile) {
    return (
      <div className={classes?.spinnerDiv}>
        <CircularProgress size={150} thickness={2} />
      </div>
    );
  }
  return (
    <Paper className={classes?.paper}>
      <div className={classes?.profile}>
        <div className='image-wrapper'>
          <img
            src={profile?.userImage}
            alt='profile'
            className='profile-image'
          />
        </div>
        <hr />
        <ProfileDetail
          profile={profile}
        />
      </div>
    </Paper>
  );
};
