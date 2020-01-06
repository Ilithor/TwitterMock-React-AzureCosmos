import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

const CommentContent = ({ classes = {}, comment = {} }) => (
  <Grid container>
    <Grid item sm={2}>
      <img
        src={comment.userImage}
        alt='comment'
        className={classes.commentImage}
      />
    </Grid>
    <Grid item sm={9}>
      <div className={classes.commentContent}>
        <Typography
          variant='h5'
          component={Link}
          to={`/user/${comment.userHandle}`}
          color='primary'
        >
          {comment.userHandle}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {dayjs(comment.createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.separator} />
        <Typography variant='body1'>{comment.body}</Typography>
      </div>
    </Grid>
  </Grid>
);

export default withStyles(style)(CommentContent);
