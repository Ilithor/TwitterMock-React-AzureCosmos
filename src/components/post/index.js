import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import relativeTime from 'dayjs/plugin/relativeTime';
import PostContent from './PostContent';

// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

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
 * @param {IPostComponentProps} props
 */
const Post = ({ classes, post }) => {
  dayjs.extend(relativeTime);
  if (!post) {
    return;
  }
  const { userImage } = post;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title='Profile image'
        className={classes.image}
      />
      <PostContent classes={classes} post={post} />
    </Card>
  );
};

Post.propTypes = {
  classes: PropTypes.object,
  post: PropTypes.object,
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
