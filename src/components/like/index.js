import React from 'react';
import { Link } from 'react-router-dom';

// Components
import UnlikeButton from './UnlikeButton';
import LikeButton from './LikeButton';
import CustomButton from '../../util/CustomButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

// Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';

/** View component for displaying either a like or unlike icon
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {boolean} props.isAuthenticated
 * @param {string} props.postId
 * @param {array} props.likeList
 */
const Like = ({ isAuthenticated, postId, likeList }) => {
  const alreadyLiked = () => {
    if (likeList && likeList.find(like => like.postId === postId)) {
      return true;
    } else {
      return false;
    }
  };

  if (!isAuthenticated) {
    return (
      <Link to='/login'>
        <CustomButton tip='Like'>
          <FavoriteBorder color='primary' />
        </CustomButton>
      </Link>
    );
  }
  if (alreadyLiked()) {
    return <UnlikeButton postId={postId} />;
  }
  return <LikeButton postId={postId} />;
};

const mapStateToProps = ({ user }) => {
  const isAuthenticated = !!user.authenticated;
  const likeList = user.likes;
  return {
    isAuthenticated,
    likeList,
  };
};

export default connect(mapStateToProps)(withStyles(style)(Like));
