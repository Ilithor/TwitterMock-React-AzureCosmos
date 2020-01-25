import React from 'react';

// MUI
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import IconButton from '@material-ui/core/IconButton';

export default ({
  children,
  onClick,
  component,
  to,
  tip,
  btnClassName,
  tipClassName,
  disabled,
}) => (
  <Tooltip title={tip} className={tipClassName} placement='top'>
    <span>
      <IconButton
        onClick={onClick}
        component={component}
        to={to}
        className={btnClassName}
        disabled={disabled}
      >
        {children}
      </IconButton>
    </span>
  </Tooltip>
);
