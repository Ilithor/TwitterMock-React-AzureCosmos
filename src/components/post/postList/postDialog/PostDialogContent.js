import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Components
import { Like } from '../../../like';
import { Comment } from '../../../comment';
import { CommentForm } from '../../../comment/newComment/CommentForm';
import { CustomButton } from '../../../../util/CustomButton';

// MUI
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

const useStyles = makeStyles({
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  separator: {
    border: 'none',
    margin: 4,
  },
});

/** View component for displaying the content in a post's dialog box
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.userHandle
 * @param {string} props.userImage
 * @param {Date} props.createAt
 * @param {string} props.body
 */
export const PostDialogContent = ({
  userHandle,
  userImage,
  createdAt,
  body,
  postId,
  likeCount,
  commentCount,
  commentList = [],
}) => {
  const classes = useStyles();
  const RecentCommentMarkup = () => {
    return commentList?.map(comment => (
      <Comment key={`comment-${comment?._id}`} comment={comment} />
    ));
  };
  return (
    <Grid container spacing={5}>
      <Grid item sm={5}>
        <img src={userImage} alt='Profile' className={classes?.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color='primary'
          variant='h5'
          to={`/u/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes?.separator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes?.separator} />
        <Typography variant='body1'>{body}</Typography>
        <Like postId={postId} />
        <span>{likeCount} likes</span>
        <CustomButton tip='comments'>
          <Icon.Chat color='primary' />
        </CustomButton>
        <span>{commentCount} comments</span>
      </Grid>
      <CommentForm postId={postId} />
      <RecentCommentMarkup />
    </Grid>
  );
};
