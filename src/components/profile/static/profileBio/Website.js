import React, { Fragment } from 'react';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../../style';

// Icons
import LinkIcon from '@material-ui/icons/Link';

const WebsiteView = ({ website }) => {
  if (!!website) {
    const link = (
      <a href={website} target='_blank' rel='noopener noreferrer'>
        {' '}
        {website}
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

export const Website = withStyles(style)(WebsiteView);
