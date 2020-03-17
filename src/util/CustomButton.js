import React from 'react';

// MUI
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import IconButton from '@material-ui/core/IconButton';

/** A Custom button that can take in various differen kinds of props
 *
 * @type {ICustomButtonComponentProps}
 * @returns {React.FunctionComponent}
 */
export const CustomButton = ({
  children,
  onClick,
  link,
  to,
  tip,
  btnClassName,
  tipClassName,
  disabled,
  color,
  variant,
}) => (
  <Tooltip title={tip} className={tipClassName} placement='top'>
    <span>
      <IconButton
        onClick={onClick}
        component={link}
        to={to}
        className={btnClassName}
        disabled={disabled}
        color={color}
        variant={variant}
      >
        {children}
      </IconButton>
    </span>
  </Tooltip>
);

/**
 * @typedef ICustomButtonComponentProps
 * @property {React.ReactChild} children
 * @property {()=>void} onClick
 * @property {import("react-router-dom").Link} link
 * @property {string} to
 * @property {string} tip
 * @property {string} btnClassName
 * @property {string} tipClassName
 * @property {boolean} disabled
 * @property {string} color
 * @property {string} variant
 */
