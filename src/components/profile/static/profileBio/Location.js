import React, { Fragment } from 'react';

// Icons
import * as Icon from '@material-ui/icons';

export const Location = ({ location }) => {
  if (Location) {
    return (
      <Fragment>
        <Icon.LocationOn color='primary' />
        <span>{location}</span>
        <hr />
      </Fragment>
    );
  }
  return <div />;
};
