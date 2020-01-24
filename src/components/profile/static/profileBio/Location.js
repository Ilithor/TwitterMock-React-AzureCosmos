import React, { Fragment } from 'react';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../../style';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';

const LocationView = ({ location }) => {
  if (!!location) {
    return (
      <Fragment>
        <LocationOn color='primary' />
        <span>{location}</span>
        <hr />
      </Fragment>
    );
  }
  return <div />;
};

export const Location = withStyles(style)(LocationView);
