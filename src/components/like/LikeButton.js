import React from 'react';

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
export const LikeButton = ({ postId, getLikePost, UI = {} }) => {
  const likePost = () => {
    getLikePost(postId);
  };
  return (
    <CustomButton tip='Like' onClick={likePost} disabled={UI.isLoading}>
      <FavoriteBorder color='primary' />
    </CustomButton>
  );
};

const mapStateToProps = ({ UI }) => ({ UI });
export default connect(
  mapStateToProps,
  { getLikePost }
)(withStyles(style)(LikeButton));

/**
 * @typedef ILikeButtonComponentProps
 * @param {string} postId
 * @param {any} getLikePost
 */
