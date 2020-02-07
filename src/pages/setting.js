import React from 'react';

// Components
import { DeleteUser } from '../components/setting/DeleteUser';

// MUI
import { Grid } from '@material-ui/core';
import { useStyles } from './page.style';

/** Displays the settings page
 *
 * @type {React.FunctionComponent}
 */
export const SettingPage = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes?.settingButton}>
      <DeleteUser />
    </Grid>
  );
};
