import React from 'react';

// MUI
import { TextField, CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField: {
    margin: '10px auto 10px auto',
  },
  submitButton: {
    position: 'relative',
  },
  progressSpinner: {
    position: 'absolute',
  },
});

export const NewPostForm = ({
  handleSubmit,
  error = {},
  handleChange,
  isLoading,
}) => {
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name='body'
        type='text'
        label='New Post'
        multiline
        rows='3'
        placeholder='Type post here...'
        error={error?.body ? true : false}
        helperText={error?.body}
        className={classes?.textField}
        onChange={handleChange}
        fullWidth
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        className={classes?.submitButton}
        disabled={isLoading}
      >
        Submit
        {isLoading && (
          <CircularProgress size={30} className={classes?.progressSpinner} />
        )}
      </Button>
    </form>
  );
};
