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
        id='New Post'
        name='New Post'
        title='New Post'
        label='New Post'
        type='textarea'
        multiline
        rows='3'
        error={error?.body ? true : false}
        helperText={error?.body}
        className={classes?.textField}
        onChange={handleChange}
        fullWidth
      />
      <Button
        name='submit'
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
