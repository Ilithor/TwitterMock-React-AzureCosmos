import React, { Fragment } from 'react';

// Icons
import * as Icon from '@material-ui/icons';

/** Displays the user's location
 *
 * @type {ILocationComponentProps}
 * @returns {React.FunctionComponent}
 */
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

/**
 * @typedef ILocationComponentProps
 * @property {string} location
 */
