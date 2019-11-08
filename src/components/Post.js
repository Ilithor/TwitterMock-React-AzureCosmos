import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const style = {
  card: {
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
 * @param {IPostComponentProps} props
 */
const Post = ({
  classes,
  post: {
    body,
    createdAt,
    userImage,
    userHandle,
    likeCount,
    commentCount,
    postId,
  },
}) => {
  dayjs.extend(relativeTime);
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
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
      </CardContent>
    </Card>
  );
};

/** Component representing an individual post on the page.
 * @param {{post:IPost}} props
 */
export default withStyles(style)(Post);

/** Props passed to the Post view component
 * @typedef IPostComponentProps
 * @property {IPost} post
 * @property {object} classes
 */

/** Props that represent a post being rendered.
 * @typedef IPost
 * @property {any} body
 * @property {string|Date} createdAt
 * @property {string} userImage
 * @property {string} userHandle
 * @property {number} likeCount
 * @property {number} commentCount
 * @property {string} postId
 */
