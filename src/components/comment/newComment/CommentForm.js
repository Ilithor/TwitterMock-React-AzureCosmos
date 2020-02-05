import React, { useState, useEffect } from 'react';

// MUI
import { Button, Grid, TextField } from '@material-ui/core';
import { useStyles } from '../comment.style';

// Context
import {
  useCommentOnPostData,
  useCommentListData,
  useCommentValidationData,
} from '../commentContext';
import { usePostData } from '../../post/postContext';

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
  const {
    validationCheckComment,
    commentValidationError,
    setCommentValidationError,
  } = useCommentValidationData();
  const [body, setBody] = useState('');

  const handleChange = event => {
    if (commentValidationError) {
      setCommentValidationError();
    }
    setBody(validationCheckComment(event.target.value));
  };

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
        <TextField
          name='body'
          type='text'
          label='Comment on post'
          error={
            commentValidationError?.comment
              ? true
              : false || commentError?.comment
              ? true
              : false
          }
          helperText={commentValidationError?.comment || commentError?.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes?.textField}
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
