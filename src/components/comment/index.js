import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style';

const Comment = ({ classes = {}, comment = {} }) => (
  <Card className={classes.commentCard}>
    <CardMedia
      className={classes.commentImage}
      image={comment.userImage}
      title='Comment'
    />
    <CardContent>
      <Typography
        variant='h5'
        component={Link}
        to={`/user/${comment.userHandle}`}
        color='primary'
      >
        @{comment.userHandle}
      </Typography>
      <Typography variant='body2' color='textSecondary'>
        {dayjs(comment.createdAt).format('h:mm a, MMMM DD YYYY')}
      </Typography>
      <Typography variant='body1'>{comment.body}</Typography>
    </CardContent>
  </Card>
);

export default withStyles(style)(Comment);
