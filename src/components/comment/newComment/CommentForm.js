import React, { useState, useEffect } from 'react';

// MUI
import { Button, Grid, TextField } from '@material-ui/core';
import { useStyles } from '../comment.style';

// Context
import { useCommentOnPostData } from '../commentContext';

/** Displays and handles the new comment form
 * 
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 */
export const CommentForm = ({ postId }) => {
  const classes = useStyles();
  const {
    commentOnPost,
    isLoadingCommentOnPost,
    commentError,
  } = useCommentOnPostData();
  const [body, setBody] = useState('');

  const handleChange = event => {
    setBody(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const commentData = { body };
    commentOnPost(postId, commentData);
  };

  useEffect(() => {
    if (!commentError && !isLoadingCommentOnPost) {
      setBody('');
    }
  }, [commentError, isLoadingCommentOnPost]);
  return (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name='body'
          type='text'
          label='Comment on post'
          error={commentError}
          helperText={commentError}
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
