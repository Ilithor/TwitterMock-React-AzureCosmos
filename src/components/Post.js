import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CustomButton from '../util/CustomButton';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import style from '../style/style';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { getLikePost, getUnlikePost } from '../redux/actions/dataActions';

/** View component for displaying an individual post on the site
 * @param {IPostComponentProps} props
 */
class Post extends Component {
  alreadyLiked = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.postId === this.props.post.postId)
    ) {
      return true;
    } else {
      return false;
    }
  };
  likePost = () => {
    this.props.getLikePost(this.props.post.postId);
  };
  unlikePost = () => {
    this.props.getUnlikePost(this.props.post.postId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: { body, createdAt, userImage, userHandle, likeCount, commentCount },
      user: { authenticated },
    } = this.props;
    const likeButton = !authenticated ? (
      <CustomButton tip='Like'>
        <Link to='/login'>
          <FavoriteBorder color='primary' />
        </Link>
      </CustomButton>
    ) : this.alreadyLiked() ? (
      <CustomButton tip='Undo like' onClick={this.unlikePost}>
        <FavoriteIcon color='primary' />
      </CustomButton>
    ) : (
      <CustomButton tip='Like' onClick={this.likePost}>
        <FavoriteBorder color='primary' />
      </CustomButton>
    );
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile image'
          className={classes.imageUser}
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/user/${userHandle}`}
            color='primary'
          >
            {userHandle}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <CustomButton tip='comments'>
            <ChatIcon color='primary' />
          </CustomButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  getLikePost: PropTypes.func.isRequired,
  getUnlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionsToProps = {
  getLikePost,
  getUnlikePost,
};

/** Component representing an individual post on the page.
 * @param {{post:IPost}} props
 */
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(Post));

/** Props passed to the Post view component
 * @typedef IPostComponentProps
 * @property {IPost} post
 * @property {object} classes
 */

/** Props that represent a post being rendered.
 * @typedef IPost
 * @property {any} body
 * @property {string|Date} createdAt
 * @property {string} userImage
 * @property {string} userHandle
 * @property {number} likeCount
 * @property {number} commentCount
 * @property {string} postId
 */
