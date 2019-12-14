import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

/** View component for displaying the user's profile details
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.handle
 * @param {object} props.bio
 * @param {string} props.createdAt
 */
const ProfileDetails = ({ handle, bio = {}, createdAt }) => {
  return (
    <div className='profile-details'>
      <MuiLink
        component={Link}
        to={`/user/${handle}`}
        color='primary'
        variant='h5'
      >
        @{handle}
      </MuiLink>
      <hr />
      {bio.aboutMe && <Typography variant='body2'>{bio.aboutMe}</Typography>}
      <hr />
      {bio.location && (
        <Fragment>
          <LocationOn color='primary' /> <span>{bio.location}</span>
          <hr />
        </Fragment>
      )}
      {bio.website && (
        <Fragment>
          <LinkIcon color='primary' />
          <a href={bio.website} target='_blank' rel='noopener noreferrer'>
            {' '}
            {bio.website}
          </a>
          <hr />
        </Fragment>
      )}
      <CalendarToday color='primary' />{' '}
      <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
    </div>
  );
};

export default withStyles(style)(ProfileDetails);
