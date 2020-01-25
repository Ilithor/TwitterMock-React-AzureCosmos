import React from 'react';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const NewPostFormView = ({
  handleSubmit,
  error = {},
  classes = {},
  handleChange,
  isLoading,
}) => (
  <form onSubmit={handleSubmit}>
    <TextField
      name='body'
      type='text'
      label='New Post'
      multiline
      rows='3'
      placeholder='Type post here...'
      error={error.body ? true : false}
      helperText={error.body}
      className={classes.textField}
      onChange={handleChange}
      fullWidth
    />
    <Button
      type='submit'
      variant='contained'
      color='primary'
      className={classes.submitButton}
      disabled={isLoading}
    >
      Submit
      {isLoading && (
        <CircularProgress size={30} className={classes.progressSpinner} />
      )}
    </Button>
  </form>
);

export const NewPostForm = withStyles(style)(NewPostFormView);
