import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import PostContent from './PostContent';

// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';

const style = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

/** View component for displaying an individual post on the site
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {object} props.post
 */
const Post = ({ classes = {}, post = {} }) => {
  dayjs.extend(relativeTime);
  if (!post) {
    return;
  }
  const {
    userImage,
    userHandle,
    createdAt,
    body,
    postId,
    likeCount,
    commentCount,
  } = post;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title='Profile image'
        className={classes.image}
      />
      <PostContent
        classes={classes}
        userHandle={userHandle}
        createdAt={createdAt}
        body={body}
        postId={postId}
        likeCount={likeCount}
        commentCount={commentCount}
      />
    </Card>
  );
};

export default withStyles(style)(Post);
