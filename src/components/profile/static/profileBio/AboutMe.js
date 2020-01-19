import React from 'react';

// MUI
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../../style';

const AboutMe = ({ aboutMe }) => {
  if (!!aboutMe) {
    return <Typography variant='body2'>{aboutMe}</Typography>;
  }
  return <div />;
};

export default withStyles(style)(AboutMe);
