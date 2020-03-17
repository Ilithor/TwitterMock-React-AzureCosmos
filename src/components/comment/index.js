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
import { useUserListData } from '../profile/user/userListContext';

/** Displays the comment card
 *
 * @type {ICommentComponentProps}
 * @returns {React.FunctionComponent}
 */
export const Comment = ({ comment }) => {
  const classes = useStyles();
  const { userList } = useUserListData();
  const { userImage } = userList?.[comment?.userHandle] || defaultImage;
  return (
    <Card className={classes?.commentCard}>
      <div className={classes?.commentImageContainer}>
        <CardMedia
          className={classes?.commentImage}
          image={userImage || defaultImage}
          title='Comment'
        />
      </div>
      <CardContent className={classes?.cardContent}>
        <Typography
          variant='h5'
          link={Link}
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

/**
 * @typedef ICommentComponentProps
 * @property {Comment} comment
 */

/**
 * @typedef Comment
 * @property {string} commentId
 * @property {string} userHandle
 * @property {string} postId
 * @property {string} body
 * @property {Date} createdAt
 */
