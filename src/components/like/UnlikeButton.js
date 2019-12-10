import React from 'react';
import CustomButton from '../../util/CustomButton';
import style from '../../style/style';
import PropTypes from 'prop-types';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';

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
const UnlikeButton = ({ postId, getUnlikePost }) => {
  const unlikePost = () => {
    getUnlikePost(postId);
  };

  return (
    <CustomButton tip='Undo like' onClick={unlikePost}>
      <FavoriteIcon color='primary' />
    </CustomButton>
  );
};

UnlikeButton.propTypes = {
  postId: PropTypes.string,
  getUnlikePost: PropTypes.func,
};

export default connect(
  null,
  { getUnlikePost }
)(withStyles(style)(UnlikeButton));
