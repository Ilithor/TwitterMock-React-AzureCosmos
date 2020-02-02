import React, { useEffect } from 'react';
import _ from 'lodash';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import defaultImage from '../../../../images/user.png';

// Components
import { Like } from '../../../like';
import { Comment } from '../../../comment';
import { NewComment } from '../../../comment/newComment';
import { CustomButton } from '../../../../util/CustomButton';

// MUI
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useCommentListData } from '../../../comment/commentContext';
import { useLikeData } from '../../../like/likeContext';

const useStyles = makeStyles({
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  separator: {
    border: 'none',
    margin: 4,
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

/** View component for displaying the content in a post's dialog box
 * @type {React.FunctionComponent}
 * @param {Object} props
 * @param {String} props.userHandle
 * @param {String} props.userImage
 * @param {String} props.createAt
 * @param {String} props.body
 * @param {String} props.postId
 * @param {Number} props.likeCount
 * @param {Number} props.commentCount
 */
export const PostDialogContent = ({
  userHandle,
  userImage,
  createdAt,
  body,
  postId,
  likeCount,
  commentCount,
}) => {
  const classes = useStyles();
  const params = useParams();
  const { likeList } = useLikeData();
  const {
    refreshCommentListOnPost,
    isLoadingCommentList,
    commentListOnPost,
  } = useCommentListData();
  useEffect(() => {
    refreshCommentListOnPost(params?.postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const RecentCommentMarkup = () => {
    if (!isLoadingCommentList && commentListOnPost) {
      return _.map(commentListOnPost, comment => (
        <Comment key={`comment-${comment?.commentId}`} comment={comment} />
      ));
    }
    if (commentListOnPost?.length === 0) {
      return <div />;
    }
    return (
      <div className={classes?.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    );
  };
  const LikePlural = () => {
    if (likeCount === 1) {
      return ' Like';
    }
    return ' Likes';
  };
  const CommentPlural = () => {
    if (commentCount === 1) {
      return ' Comment';
    }
    return ' Comments';
  };
  return (
    <Grid container spacing={5}>
      <Grid item sm={5}>
        <img
          src={userImage || defaultImage}
          alt='Profile'
          className={classes?.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color='primary'
          variant='h5'
          to={`/u/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes?.separator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes?.separator} />
        <Typography variant='body1'>{body}</Typography>
        <Like postId={postId} like={likeList[(params?.postId)]} />
        <span>
          {likeCount}
          <LikePlural />
        </span>
        <CustomButton tip='comments'>
          <Icon.Chat color='primary' />
        </CustomButton>
        <span>
          {commentCount}
          <CommentPlural />
        </span>
      </Grid>
      <NewComment postId={postId} />
      <RecentCommentMarkup />
    </Grid>
  );
};
