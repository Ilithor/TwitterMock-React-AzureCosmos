import React, { useState, useEffect } from 'react';

// MUI
import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Context
import { useCommentOnPostData } from '../commentContext';

const useStyles = makeStyles({
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: '20',
    position: 'relative',
  },
});

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
