import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { CustomButton } from '../util/CustomButton';

// MUI
import { AppBar, Toolbar } from '@material-ui/core';

// Icons
import * as Icon from '@material-ui/icons';

export const Footer = () => (
  <div className='footer-container'>
    <AppBar>
      <Toolbar className='footer-buttons'>
        <CustomButton tip='About Us' component={Link} to='/about'>
          <Icon.Info />
        </CustomButton>
      </Toolbar>
    </AppBar>
  </div>
);
