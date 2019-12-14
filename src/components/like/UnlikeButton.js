import React, { useState } from 'react';

// Components
import CustomButton from '../../util/CustomButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';

// Redux
import { connect } from 'react-redux';
import { getUnlikePost } from '../../redux/actions/dataActions';

/** View component for displaying an icon to unlike a post
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 * @param {any} props.getUnlikePost
 */
export const UnlikeButton = ({ postId, getUnlikePost }) => {
  const [disabled, setDisabled] = useState(false);
  const handleDisabled = () => setDisabled(true);
  const handleEnabled = () => setDisabled(false);
  const unlikePost = () => {
    getUnlikePost(postId);
    handleEnabled();
  };

  return (
    <CustomButton
      tip='Undo like'
      onClick={(handleDisabled, unlikePost)}
      disabled={disabled}
    >
      <FavoriteIcon color='primary' />
    </CustomButton>
  );
};

export default connect(
  null,
  { getUnlikePost }
)(withStyles(style)(UnlikeButton));

/**
 * @typedef IUnlikeButtonComponentProps
 * @param {string} postId
 * @param {any} getUnlikePost
 */
