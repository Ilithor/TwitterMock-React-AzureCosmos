import React from 'react';

// MUI
import { TextField, CircularProgress, Button } from '@material-ui/core';
import { useStyles } from '../post.style';

/** Form for the user to create a post
 *
 * @type {INewPostFormComponentProps}
 * @returns {React.FunctionComponent}
 */
export const NewPostForm = ({
  error,
  isLoading,
  handleSubmit,
  handleChange,
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

/**
 * @typedef INewPostFormComponentProps
 * @property {Error} error
 * @property {boolean} isLoading
 * @property {React.ChangeEventHandler} handleSubmit
 * @property {React.ChangeEventHandler} handleChange
 */
