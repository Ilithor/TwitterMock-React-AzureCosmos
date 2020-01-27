import React, { useState, useEffect } from 'react';

// MUI
import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';
import { getCommentPost } from '../../../redux/actions/dataActions';

const useStyles = makeStyles({
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: '20',
    position: 'relative',
  },
});

const CommentFormView = ({ postId, UI, getCommentPost }) => {
  const classes = useStyles();
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

const mapStateToProps = ({ UI }) => ({ UI });

export const CommentForm = connect(
  mapStateToProps,
  { getCommentPost }
)(CommentFormView);
