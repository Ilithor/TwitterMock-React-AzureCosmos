import React, { Fragment } from 'react';

// Icons
import * as Icon from '@material-ui/icons';

/** Displays the user's website
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.website
 */
export const Website = ({ website }) => {
  if (website) {
    const link = (
      <a href={website} target='_blank' rel='noopener noreferrer'>
        {website}
      </a>
    );
    return (
      <Fragment>
        <Icon.Link color='primary' />
        {link}
        <hr />
      </Fragment>
    );
  }
  return <div />;
};
