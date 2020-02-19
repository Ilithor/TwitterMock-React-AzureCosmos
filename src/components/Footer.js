import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { Button } from '@material-ui/core';

// Icons
import * as Icon from '@material-ui/icons';

export const Footer = () => (
  <div className='footer-container'>
    <div className='footer-column'></div>
    <div className='footer-column'>
      <Button variant='contained' color='primary' component={Link} to='/about'>
        About Us <Icon.Info />
      </Button>
    </div>
    <div className='footer-column'></div>
  </div>
);
