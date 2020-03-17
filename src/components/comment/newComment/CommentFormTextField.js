import React from 'react';

// MUI
import { TextField } from '@material-ui/core';
import { useStyles } from '../comment.style';

// Context
import { useCommentValidationData } from '../commentContext';

/** Displays and handles the new comment text field
 *
 * @type {ICommentFormTextFieldComponentProps}
 * @returns {React.FunctionComponent}
 */
export const CommentFormTextField = ({ setBody, commentError, body }) => {
  const classes = useStyles();
  const {
    commentValidationError,
    setCommentValidationError,
    validationCheckComment,
  } = useCommentValidationData();
  const handleChange = event => {
    if (commentValidationError) {
      setCommentValidationError();
    }
    setBody(validationCheckComment(event.target.value));
  };
  return (
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
  );
};

/**
 * @typedef ICommentFormTextFieldComponentProps
 * @property {React.Dispatch<React.SetStateAction<string>>} setBody
 * @property {Error} commentError
 * @property {string} body
 */
