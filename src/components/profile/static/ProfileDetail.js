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

export const ProfileDetail = ({ user }) => (
  <div className='profile-details'>
    <MuiLink
      component={Link}
      to={`/u/${user?.userHandle}`}
      color='primary'
      variant='h5'
    >
      @{user?.userHandle}
    </MuiLink>
    <hr />
    <AboutMe aboutMe={user?.aboutMe} />
    <hr />
    <Location location={user?.location} />
    <Website website={user?.website} />
    <Icon.CalendarToday color='primary' />
    <span>Joined {dayjs(user?.createdAt).format('MMM YYYY')}</span>
  </div>
);
