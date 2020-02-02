import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Components
import { Like } from '../../like';
import { DeletePost } from './deletePost';
import { PostDialog } from './postDialog';
import { CustomButton } from '../../../util/CustomButton';

// MUI
import { CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

const useStyles = makeStyles({
  content: {
    padding: 25,
    objectFit: 'cover',
  },
});

/** View component for displaying an individual post's content
 * @type {React.FunctionComponent}
 * @param {Object} props
 * @param {Object} props.post
 * @param {Object} props.like
 */
export const PostContent = ({ post, like }) => {
  const classes = useStyles();
  const LikePlural = () => {
    if (post?.likeCount === 1) {
      return ' Like';
    }
    return ' Likes';
  };
  const CommentPlural = () => {
    if (post?.commentCount === 1) {
      return ' Comment';
    }
    return ' Comments';
  };
  return (
    <CardContent className={classes?.content}>
      <Typography
        variant='h5'
        component={Link}
        to={`/u/${post?.userHandle}`}
        color='primary'
      >
        {post?.userHandle}
      </Typography>
      <DeletePost postId={post?.postId} userHandle={post?.userHandle} />
      <Typography variant='body2' color='textSecondary'>
        {dayjs(post?.createdAt).fromNow()}
      </Typography>
      <Typography variant='body1'>{post?.body}</Typography>
      <Like postId={post?.postId} userHandle={post?.userHandle} like={like} />
      <span>
        {post?.likeCount} <LikePlural />
      </span>
      <CustomButton tip='comments'>
        <Icon.Chat color='primary' />
      </CustomButton>
      <span>
        {post?.commentCount} <CommentPlural />
      </span>
      <PostDialog postId={post?.postId} userHandle={post?.userHandle} />
    </CardContent>
  );
};

/** View component for displaying an individual post's content
 * @typedef IPostContentComponentProps
 * @param {object} post
 */
