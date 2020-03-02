import React, { Fragment } from 'react';

// Icons
import * as Icon from '@material-ui/icons';

/** Displays the user's website
 *
 * @type {IWebsiteComponentProps}
 * @returns {React.FunctionComponent}
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

/**
 * @typedef IWebsiteComponentProps
 * @property {string} website
 */
