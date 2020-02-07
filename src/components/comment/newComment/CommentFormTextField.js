import React from 'react';

// MUI
import { TextField } from '@material-ui/core';
import { useStyles } from '../comment.style';

// Context
import { useCommentValidationData } from '../commentContext';

/** Displays and handles the new comment text field
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {Function} props.setBody
 * @param {Error} props.commentError
 * @param {string} props.body
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
