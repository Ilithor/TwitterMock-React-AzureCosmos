import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// Components
import { Location } from './profileBio/Location';
import { Website } from './profileBio/Website';
import { AboutMe } from './profileBio/AboutMe';

// MUI
import MuiLink from '@material-ui/core/Link';

// Icons
import * as Icon from '@material-ui/icons';

export const ProfileDetail = ({ profile }) => (
  <div className='profile-details'>
    <MuiLink
      component={Link}
      to={`/u/${profile?.handle}`}
      color='primary'
      variant='h5'
    >
      @{profile?.handle}
    </MuiLink>
    <hr />
    <AboutMe aboutMe={profile?.aboutMe} />
    <hr />
    <Location location={profile?.location} />
    <Website website={profile?.website} />
    <Icon.CalendarToday color='primary' />{' '}
    <span>Joined {dayjs(profile?.createdAt).format('MMM YYYY')}</span>
  </div>
);
