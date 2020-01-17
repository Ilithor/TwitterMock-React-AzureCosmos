import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// Components
import Location from './profileBio/Location';
import Website from './profileBio/Website';
import AboutMe from './profileBio/AboutMe';

// MUI
import MuiLink from '@material-ui/core/Link';

// Icons
import CalendarToday from '@material-ui/icons/CalendarToday';

const ProfileDetails = ({ handle, bio, createdAt }) => (
  <div className='profile-details'>
    <MuiLink component={Link} to={`/${handle}`} color='primary' variant='h5'>
      @{handle}
    </MuiLink>
    <hr />
    <AboutMe aboutMe={bio.aboutMe} />
    <hr />
    <Location location={bio.location} />
    <Website website={bio.website} />
    <CalendarToday color='primary' />{' '}
    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
  </div>
);

export default ProfileDetails;
