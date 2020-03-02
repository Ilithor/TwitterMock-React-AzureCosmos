import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { Button } from '@material-ui/core';

// Icons
import * as Icon from '@material-ui/icons';

/** Displays the footer on the page
 *
 * @returns {React.FunctionComponent}
 */
export const Footer = () => (
  <div className='footer-container'>
    <div className='footer-column'></div>
    <div className='footer-column'>
      <Button variant='contained' color='primary' link={Link} to='/about'>
        About Us <Icon.Info />
      </Button>
    </div>
    <div className='footer-column'></div>
  </div>
);
