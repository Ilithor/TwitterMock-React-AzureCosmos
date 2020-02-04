import React, { Fragment } from 'react';

// Icons
import * as Icon from '@material-ui/icons';

/** Displays the user's location
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.location
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
