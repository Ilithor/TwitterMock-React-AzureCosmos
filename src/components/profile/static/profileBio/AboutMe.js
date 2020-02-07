import React from 'react';

// MUI
import { Typography } from '@material-ui/core';

/** Displays the user's about me
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.aboutMe
 */
export const AboutMe = ({ aboutMe }) => {
  if (aboutMe) {
    return <Typography variant='body2'>{aboutMe}</Typography>;
  }
  return <div />;
};
