import React from 'react';

// MUI
import { Typography } from '@material-ui/core';

/** Displays the user's about me
 *
 * @type {IAboutMeComponentProps}
 * @returns {React.FunctionComponent}
 */
export const AboutMe = ({ aboutMe }) => {
  if (aboutMe) {
    return <Typography variant='body2'>{aboutMe}</Typography>;
  }
  return <div />;
};

/**
 * @typedef IAboutMeComponentProps
 * @property {string} aboutMe
 */
