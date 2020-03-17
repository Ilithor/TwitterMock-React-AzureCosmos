import React, { useEffect } from 'react';

// Components
import { DeleteUser } from '../components/setting/DeleteUser';

// MUI
import { Grid } from '@material-ui/core';
import { useStyles } from './page.style';

// Context
import { useHelmetData } from '../util/helmetContext';

/** Displays the settings page
 *
 * @returns {React.FunctionComponent}
 */
export const SettingPage = () => {
  const classes = useStyles();
  const { setCurrentPage } = useHelmetData();
  useEffect(() => {
    setCurrentPage('Settings');
  });
  return (
    <Grid container className={classes?.settingButton}>
      <DeleteUser />
    </Grid>
  );
};
