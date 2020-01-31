import React from 'react';

// MUI
import { Typography } from '@material-ui/core';

export const AboutMe = ({ aboutMe }) => {
  if (!!aboutMe) {
    return <Typography variant='body2'>{aboutMe}</Typography>;
  }
  return <div />;
};
