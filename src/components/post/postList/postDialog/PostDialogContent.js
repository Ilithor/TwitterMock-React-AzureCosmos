import React, { useEffect, useState } from 'react';
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
import { useStyles } from '../../post.style';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useCommentListData } from '../../../comment/commentContext';
import { useLikeData } from '../../../like/likeContext';

/** View component for displaying the content in a post's dialog box
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.userHandle
 * @param {string} props.userImage
 * @param {string} props.createAt
 * @param {string} props.body
 * @param {string} props.postId
 * @param {number} props.likeCount
 * @param {number} props.commentCount
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
  const { commentList, isLoadingCommentList } = useCommentListData();
  const [postCommentList, setPostCommentList] = useState({});
  useEffect(() => {
    const commentData = _.values(commentList).filter(
      comment => comment?.postId === params.postId
    );
    if (commentData) {
      setPostCommentList(commentData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentList]);
  const RecentCommentMarkup = () => {
    if (!isLoadingCommentList && commentList) {
      return _.map(postCommentList, comment => {
        return (
          <Comment key={`comment-${comment?.commentId}`} comment={comment} />
        );
      });
    }
    if (commentList?.length === 0) {
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
        <Like postId={postId} like={likeList[postId]} />
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
