import React from 'react';

// Components
import { CustomButton } from '../../util/CustomButton';

// Icons
import * as Icon from '@material-ui/icons';

/** View component for displaying an icon to unlike a post
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 */
export const UnlikeButton = ({ postId, onClick }) => {
  return (
    <CustomButton tip='Undo like' onClick={onClick}>
      <Icon.Favorite color='primary' />
    </CustomButton>
  );
};

/**
 * @typedef IUnlikeButtonComponentProps
 * @param {string} postId
 */
