import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Components
import Like from '../../../like';
import Comment from '../../../comment';
import CustomButton from '../../../../util/CustomButton';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../../style/style';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

/** View component for displaying the content in a post's dialog box
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {string} props.userHandle
 * @param {string} props.userImage
 * @param {Date} props.createAt
 * @param {string} props.body
 */
const PostDialogContent = ({
  classes = {},
  userHandle,
  userImage,
  createdAt,
  body,
  postId,
  likeCount,
  commentCount,
  commentList = [],
}) => {
  const createRecentCommentMarkup = () => {
    return commentList.map(comment => (
      <Comment
        classes={classes}
        key={`comment-${comment._id}`}
        comment={comment}
      />
    ));
  };
  return (
    <Grid container spacing={5}>
      <Grid item sm={5}>
        <img src={userImage} alt='Profile' className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color='primary'
          variant='h5'
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.separator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.separator} />
        <Typography variant='body1'>{body}</Typography>
        <Like postId={postId} />
        <span>{likeCount} likes</span>
        <CustomButton tip='comments'>
          <ChatIcon color='primary' />
        </CustomButton>
        <span>{commentCount} comments</span>
      </Grid>
      {createRecentCommentMarkup()}
    </Grid>
  );
};

export default withStyles(style)(PostDialogContent);
