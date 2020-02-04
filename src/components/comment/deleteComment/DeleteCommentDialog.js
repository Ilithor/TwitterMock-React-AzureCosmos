import React, { useState } from 'react';

// Components
import { CustomButton } from '../../../util/CustomButton';

// MUI
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import * as Icon from '@material-ui/icons';

// Context
import { useCommentData } from '../commentContext';

/** Displays the dialog box for comment deletion confirmation
 * 
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 */
export const DeleteCommentDialog = ({ postId }) => {
  const { deleteComment } = useCommentData();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteUserComment = () => {
    deleteComment(postId);
    setOpen(false);
  };
  const makeDeleteButton = () => (
    <CustomButton tip='Delete Comment' onClick={handleOpen}>
      <Icon.DeleteOutline color='secondary' />
    </CustomButton>
  );
  if (!open) {
    return makeDeleteButton();
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>Are you sure you want to delete this comment?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={deleteUserComment} color='secondary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
