import React from 'react';

// MUI
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import IconButton from '@material-ui/core/IconButton';

/** A Custom button that can take in various differen kinds of props
 * 
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.children
 * @param {Function} props.onClick
 * @param {React.FunctionComponent} props.component
 * @param {string} props.to
 * @param {string} props.tip
 * @param {string} props.btnClassName
 * @param {string} props.tipClassName
 * @param {boolean} props.disabled
 * @param {string} props.color
 * @param {string} props.variant
 */
export const CustomButton = ({
  children,
  onClick,
  component,
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
        component={component}
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
