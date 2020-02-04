import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import defaultImage from '../../images/user.png';

// Components
import { DeleteComment } from './deleteComment/DeleteComment';

// MUI
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useStyles } from './comment.style';

// Context
import { useUserListData } from '../profile/userContext';

/** Displays the comment card
 * 
 * @type {React.FunctionComponent}
 * @param {Object} props
 * @param {Object} props.comment
 */
export const Comment = ({ comment }) => {
  const classes = useStyles();
  const { userList } = useUserListData();
  const { userImage } = userList[comment?.userHandle] || defaultImage;
  return (
    <Card className={classes?.commentCard}>
      <CardMedia
        className={classes?.commentImage}
        image={userImage}
        title='Comment'
      />
      <CardContent className={classes?.cardContent}>
        <Typography
          variant='h5'
          component={Link}
          to={`/user/${comment?.userHandle}`}
          color='primary'
        >
          @{comment?.userHandle}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {dayjs(comment?.createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <Typography variant='body1'>{comment?.body}</Typography>
      </CardContent>
      <DeleteComment
        postId={comment?.postId}
        userHandle={comment?.userHandle}
      />
    </Card>
  );
};
