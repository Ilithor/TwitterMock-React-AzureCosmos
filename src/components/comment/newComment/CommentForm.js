import React, { useState, useEffect } from 'react';

// MUI
import { Button, Grid } from '@material-ui/core';
import { useStyles } from '../comment.style';

// Context
import {
  useCommentOnPostData,
  useCommentListData,
  useCommentValidationData,
} from '../commentContext';
import { usePostData } from '../../post/postContext';
import { CommentFormTextField } from './CommentFormTextField';

/** Displays and handles the new comment form
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 */
export const CommentForm = ({ postId }) => {
  const classes = useStyles();
  const { refreshPostList } = usePostData();
  const { refreshCommentList } = useCommentListData();
  const {
    commentOnPost,
    isLoadingCommentOnPost,
    commentError,
    setCommentError,
  } = useCommentOnPostData();
  const { commentValidationError } = useCommentValidationData();
  const [body, setBody] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const commentData = { body };
    commentOnPost(postId, commentData)
      .then(() => {
        if (!commentError && !commentValidationError) {
          Promise.all([refreshPostList(), refreshCommentList()]);
        }
      })
      .catch(err => {
        console.error(err);
        setCommentError(err);
      });
  };

  useEffect(() => {
    if (!commentValidationError && !commentError && !isLoadingCommentOnPost) {
      setBody('');
    }
  }, [commentValidationError, commentError, isLoadingCommentOnPost]);
  return (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <CommentFormTextField
          setBody={setBody}
          commentError={commentError}
          body={body}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes?.button}
        >
          Submit
        </Button>
      </form>
    </Grid>
  );
};
