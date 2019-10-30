import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'react-router-dom/Link';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const style = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Post extends Component {
  render() {
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
        postId
      }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile image'
          className={classes.image}
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
            {createdAt}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(style)(Post);
