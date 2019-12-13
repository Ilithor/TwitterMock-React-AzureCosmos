import React from 'react';

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
  const unlikePost = () => {
    getUnlikePost(postId);
  };

  return (
    <CustomButton tip='Undo like' onClick={unlikePost}>
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
