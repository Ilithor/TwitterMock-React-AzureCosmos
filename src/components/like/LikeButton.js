import React, { useState } from 'react';

// Components
import CustomButton from '../../util/CustomButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

// Icons
import { FavoriteBorder } from '@material-ui/icons';

// Redux
import { connect } from 'react-redux';
import { getLikePost } from '../../redux/actions/dataActions';

/** View component for displaying an icon to like a post
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 * @param {any} props.getLikePost
 */
export const LikeButton = ({ postId, getLikePost }) => {
  const [disabled, setDisabled] = useState(false);
  const handleDisabled = () => setDisabled({ ...disabled, disabled: true });
  const handleEnabled = () => setDisabled({ ...disabled, disabled: false });
  const likePost = () => {
    getLikePost(postId);
    handleEnabled();
  };
  return (
    <CustomButton
      tip='Like'
      onClick={(handleDisabled, likePost)}
      disabled={disabled}
    >
      <FavoriteBorder color='primary' />
    </CustomButton>
  );
};

export default connect(
  null,
  { getLikePost }
)(withStyles(style)(LikeButton));

/**
 * @typedef ILikeButtonComponentProps
 * @param {string} postId
 * @param {any} getLikePost
 */
