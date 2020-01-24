import React, { useState, useEffect } from 'react';

// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Redux
import { connect } from 'react-redux';
import { getCommentPost } from '../../../redux/actions/dataActions';

const CommentFormView = ({ classes = {}, postId, UI, getCommentPost }) => {
  const [body, setBody] = useState('');

  const handleChange = event => {
    setBody(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const commentData = { body };
    getCommentPost(postId, commentData);
  };

  useEffect(() => {
    if (!UI.error.comment && !UI.isLoading) {
      setBody('');
    }
  }, [UI.error, UI.isLoading]);
  return (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name='body'
          type='text'
          label='Comment on post'
          error={!!UI.error.comment}
          helperText={UI.error.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </Grid>
  );
};

const mapStateToProps = ({ UI }) => ({ UI });

export const CommentForm = connect(
  mapStateToProps,
  { getCommentPost }
)(CommentFormView);
