import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Components
import Like from '../../like';
import DeletePost from './DeletePost';
import CustomButton from '../../../util/CustomButton';

// MUI
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

/** View component for displaying an individual post's content
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {object} props.post
 */
const PostContent = ({ classes = {}, post }) => {
  const { userHandle, createdAt, body, postId, likeCount, commentCount } = post;
  return (
    <CardContent className={classes.content}>
      <Typography
        variant='h5'
        component={Link}
        to={`/user/${userHandle}`}
        color='primary'
      >
        {userHandle}
      </Typography>
      <DeletePost classes={classes} postId={postId} userHandle={userHandle} />
      <Typography variant='body2' color='textSecondary'>
        {dayjs(createdAt).fromNow()}
      </Typography>
      <Typography variant='body1'>{body}</Typography>
      <Like postId={postId} />
      <span>{likeCount} Likes</span>
      <CustomButton tip='comments'>
        <ChatIcon color='primary' />
      </CustomButton>
      <span>{commentCount} Comments</span>
    </CardContent>
  );
};

export default withStyles(style)(PostContent);
