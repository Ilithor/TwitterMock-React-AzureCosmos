import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// MUI
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// Icons
import CalendarToday from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';
import LocationOn from '@material-ui/icons/LocationOn';

const ProfileDetails = ({ handle, bio, createdAt }) => {
  const createBio = () => {
    if (!!bio.aboutMe) {
      return <Typography variant='body2'>{bio.aboutMe}</Typography>;
    }
    return <div />;
  };

  const createLocation = () => {
    if (!!bio.location) {
      return (
        <Fragment>
          <LocationOn color='primary' />
          <span>{bio.location}</span>
          <hr />
        </Fragment>
      );
    }
    return <div />;
  };

  const createWebsite = () => {
    if (bio.website) {
      const link = (
        <a href={bio.website} target='_blank' rel='noopener noreferrer'>
          {' '}
          {bio.website}
        </a>
      );
      return (
        <Fragment>
          <LinkIcon color='primary' />
          {link}
          <hr />
        </Fragment>
      );
    }
    return <div />;
  };
  return (
    <div className='profile-details'>
      <MuiLink component={Link} to={`/${handle}`} color='primary' variant='h5'>
        @{handle}
      </MuiLink>
      <hr />
      {createBio()}
      <hr />
      {createLocation()}
      {createWebsite()}
      <CalendarToday color='primary' />{' '}
      <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
    </div>
  );
};

export default ProfileDetails;
