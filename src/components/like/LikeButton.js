import React from 'react';
import CustomButton from '../../util/CustomButton';
import style from '../../style/style';
import PropTypes from 'prop-types';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';

// Icons
import { FavoriteBorder } from '@material-ui/icons';

// Redux
import { connect } from 'react-redux';
import { getLikePost } from '../../redux/actions/dataActions';

/** View component for displaying an icon to like a post
 * @param {ILikeButtonComponentProps} props
 */
export const LikeButton = props => {
  const { postId, getLikePost } = props;
  const likePost = () => {
    getLikePost(postId);
  };
  return (
    <CustomButton tip='Like' onClick={likePost}>
      <FavoriteBorder color='primary' />
    </CustomButton>
  );
};

LikeButton.propTypes = {
  postId: PropTypes.string,
  getLikePost: PropTypes.func,
};

export default connect(
  null,
  { getLikePost }
)(withStyles(style)(LikeButton));

/** Props passed to the LikeButton view component
 * @typedef ILikeButtonComponentProps
 * @property {string} postId
 * @property {function} getLikePost
 */
