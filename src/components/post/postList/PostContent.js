import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Components
import Like from '../../like';
import DeletePost from './deletePost';
import CustomButton from '../../../util/CustomButton';
import PostDialog from './postDialog';

// MUI
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

/** View component for displaying an individual post's content
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {string} props.userHandle
 * @param {Date} props.createdAt
 * @param {string} props.body
 * @param {string} props.postId
 * @param {number} props.likeCount
 * @param {number} props.commentCount
 */
const PostContent = ({
  classes = {},
  userHandle,
  createdAt,
  body,
  userImage,
  postId,
  likeCount,
  commentCount,
  openDialog,
}) => (
  <CardContent className={classes.content}>
    <Typography
      variant='h5'
      component={Link}
      to={`/u/${userHandle}`}
      color='primary'
    >
      {userHandle}
    </Typography>
    <DeletePost classes={classes} postId={postId} userHandle={userHandle} />
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
    <PostDialog
      classes={classes}
      postId={postId}
      userHandle={userHandle}
      openDialog={openDialog}
    />
  </CardContent>
);

export default withStyles(style)(PostContent);

/** View component for displaying an individual post's content
 * @typedef IPostContentComponentProps
 * @param {object} classes
 * @param {object} post
 * @param {string} userHandle
 * @param {Date} createdAt
 * @param {string} body
 * @param {string} postId
 * @param {number} likeCount
 * @param {number} commentCount
 */
