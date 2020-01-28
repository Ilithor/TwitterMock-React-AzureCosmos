import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import { PostContent } from './PostContent';

// MUI
import { Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
});

/** View component for displaying an individual post on the site
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {object} props.post
 */
export const Post = ({ post, user, like }) => {
  const classes = useStyles();
  dayjs.extend(relativeTime);
  if (!post) {
    return;
  }
  return (
    <Card className={classes.card}>
      <CardMedia
        image={user?.userImage}
        title='Profile image'
        className={classes?.image}
      />
      <PostContent post={post} like={like} />
    </Card>
  );
};
