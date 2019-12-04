import React, { Component } from 'react';
import CustomButton from '../../util/CustomButton';
import { Link } from 'react-router-dom';
import style from '../../style/style';
import UnlikeButton from './UnlikeButton';
import LikeButton from './LikeButton';
import PropTypes from 'prop-types';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';

// Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';

/** View component for displaying either a like or unlike icon
 * @param {ILikeComponentProps} props
 */
class Like extends Component {
  alreadyLiked = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.postId === this.props.postId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {
      user: { authenticated },
      postId,
    } = this.props;
    if (!authenticated) {
      return (
        <CustomButton tip='Like'>
          <Link to='/login'>
            <FavoriteBorder color='primary' />
          </Link>
        </CustomButton>
      );
    }
    if (this.alreadyLiked()) {
      return <UnlikeButton postId={postId} />;
    }
    return <LikeButton postId={postId} />;
  }
}

Like.propTypes = {
  user: PropTypes.object,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

/** Component representing a like or unlike button
 * @param {{like:ILike}} props
 */
export default connect(mapStateToProps)(withStyles(style)(Like));

/** Props passed to the Like view component
 * @typedef ILikeComponentProps
 * @property {object} user
 * @property {string} postId
 */

/** Props that represent a like button being rendered.
 * @typedef ILike
 * @property {boolean} authenticated
 */
