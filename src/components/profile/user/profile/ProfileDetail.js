import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import MuiLink from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

// Icons
import * as Icon from '@material-ui/icons';

/** View component for displaying the user's profile details
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.handle
 * @param {object} props.bio
 * @param {string} props.createdAt
 */
export const ProfileDetail = ({ handle, bio = {}, createdAt }) => (
  <div className='profile-details'>
    <MuiLink component={Link} to={`/u/${handle}`} color='primary' variant='h5'>
      @{handle}
    </MuiLink>
    <hr />
    {bio?.aboutMe && <Typography variant='body2'>{bio?.aboutMe}</Typography>}
    <hr />
    {bio?.location && (
      <Fragment>
        <Icon.LocationOn color='primary' /> <span>{bio?.location}</span>
        <hr />
      </Fragment>
    )}
    {bio?.website && (
      <Fragment>
        <Icon.Link color='primary' />
        <a href={bio?.website} target='_blank' rel='noopener noreferrer'>
          {' '}
          {bio?.website}
        </a>
        <hr />
      </Fragment>
    )}
    <Icon.CalendarToday color='primary' />{' '}
    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
  </div>
);
