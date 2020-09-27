import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import MuiLink from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

// Icons
import * as Icon from '@material-ui/icons';

/** View component for displaying the user's profile details
 *
 * @type {IProfileBioComponentProps}
 * @returns {React.FunctionComponent}
 */
export const ProfileBio = ({ userHandle, bio, createdAt }) => (
  <div className='profile-details'>
    <MuiLink link={Link} to={`/u/${userHandle}`} color='primary' variant='h5'>
      @{userHandle}
    </MuiLink>
    <hr />
    {bio?.aboutMe && <Typography variant='body2'>{bio?.aboutMe}</Typography>}
    <hr />
    {bio?.location && (
      <Fragment>
        <span>
          <Icon.LocationOn color='primary' /> {bio?.location}
        </span>
        <hr />
      </Fragment>
    )}
    {bio?.website && (
      <Fragment>
        <Icon.Link color='primary' />
        {bio?.website && (
          <a href={bio.website} target='_blank' rel='noopener noreferrer'>
            {bio?.website}
          </a>
        )}
        <hr />
      </Fragment>
    )}
    <span>
      <Icon.CalendarToday color='primary' />
      Joined {dayjs(createdAt).format('MMM YYYY')}
    </span>
  </div>
);

/**
 * @typedef IProfileBioComponentProps
 * @property {string} userHandle
 * @property {Bio} bio
 * @property {string} createdAt
 */

/**
 * @typedef Bio
 * @property {string} aboutMe
 * @property {string} location
 * @property {string} website
 */
