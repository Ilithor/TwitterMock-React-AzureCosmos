import React from 'react';

// Components
import { ProfileDetail } from './ProfileDetail';

// MUI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style';

const StaticProfileView = ({ classes = {}, profile = {} }) => (
  <Paper className={classes.paper}>
    <div className={classes.profile}>
      <div className='image-wrapper'>
        <img src={profile.bio.image} alt='profile' className='profile-image' />
      </div>
      <hr />
      <ProfileDetail
        handle={profile.handle}
        createdAt={profile.createdAt}
        bio={profile.bio}
      />
    </div>
  </Paper>
);

export const StaticProfile = withStyles(style)(StaticProfileView);
