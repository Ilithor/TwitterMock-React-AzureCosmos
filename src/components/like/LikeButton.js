import React from 'react';

// Components
import { CustomButton } from '../../util/CustomButton';

// Icons
import * as Icon from '@material-ui/icons';

/** View component for displaying an icon to like a post
 *
 * @type {ILikeButtonComponentProps}
 * @returns {React.FunctionComponent}
 */
export const LikeButton = ({ onClick }) => (
  <CustomButton tip='Like' onClick={onClick}>
    <Icon.FavoriteBorder color='primary' />
  </CustomButton>
);

/**
 * @typedef ILikeButtonComponentProps
 * @property {()=>void} onClick
 */
