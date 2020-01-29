import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Context
import { useUserListData } from '../profile/userContext';

const useStyles = makeStyles({
  commentCard: {
    display: 'flex',
    flexDirection: 'row',
    width: 600,
    border: '1px solid rgba(0, 0, 0, 0.5)',
    marginBottom: 1,
  },
  commentImage: {
    minWidth: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
    marginLeft: 10,
    marginTop: 25,
  },
});

export const Comment = ({ comment = {} }) => {
  const classes = useStyles();
  const { userList } = useUserListData();
  const { userImage } = userList[(comment?.userHandle)];
  return (
    <Card className={classes?.commentCard}>
      <CardMedia
        className={classes?.commentImage}
        image={userImage}
        title='Comment'
      />
      <CardContent>
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
    </Card>
  );
};
