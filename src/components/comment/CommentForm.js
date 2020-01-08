import React, { useState, useEffect } from 'react';

// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

// Redux
import { connect } from 'react-redux';
import { getCommentPost } from '../../redux/actions/dataActions';

const CommentForm = ({
  classes,
  postId,
  UI,
  isAuthenticated,
  getCommentPost,
}) => {
  const [body, setBody] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setBody(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const commentData = { body };
    getCommentPost(postId, commentData);
  };

  useEffect(() => {
    if (!UI.error.body && !UI.isLoading) {
      setBody('');
    }
  }, [UI.error, UI.isLoading]);

  const createCommentForm = () => {
    if (isAuthenticated) {
      return (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name='body'
              type='text'
              label='Comment on post'
              error={UI.error.comment ? true : false}
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
    }
  };

  return createCommentForm();
};

const mapStateToProps = state => {
  const UI = state.UI;
  const isAuthenticated = !!state.user.authenticated;
  return { UI, isAuthenticated };
};

export default connect(
  mapStateToProps,
  { getCommentPost }
)(withStyles(style)(CommentForm));
