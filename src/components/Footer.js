import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { CustomButton } from '../util/CustomButton';

// Icons
import * as Icon from '@material-ui/icons';

export const Footer = () => (
  <div className='footer-container'>
    <CustomButton tip='About Us' component={Link} to='/about'>
      <Icon.Info />
    </CustomButton>
  </div>
);
