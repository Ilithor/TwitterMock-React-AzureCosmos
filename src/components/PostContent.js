import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import Like from './like';
import CustomButton from '../util/CustomButton';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import style from '../style/style';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

/** View component for displaying an individual post's content'
 * @param {IPostComponentProps} props
 */
const PostContent = ({ classes, post }) => {
  const { userHandle, createdAt, body, postId, likeCount, commentCount } = post;
  return (
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
      <Like postId={postId} />
      <span>{likeCount} Likes</span>
      <CustomButton tip='comments'>
        <ChatIcon color='primary' />
      </CustomButton>
      <span>{commentCount} Comments</span>
    </CardContent>
  );
};

PostContent.propTypes = {
  classes: PropTypes.object,
  post: PropTypes.object,
};

/** Component representing an individual post's content on the page.
 * @param {{post:IPost}} props
 */
export default withStyles(style)(PostContent);

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
