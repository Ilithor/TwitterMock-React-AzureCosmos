import React, { useState } from 'react';

// Components
import { CustomButton } from '../../../util/CustomButton';

// MUI
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import * as Icon from '@material-ui/icons';

// Context
import { useCommentData, useCommentListData } from '../commentContext';
import { usePostData } from '../../post/postContext';

/** Displays the dialog box for comment deletion confirmation
 *
 * @type {IDeleteCommentDialogComponentProps}
 * @returns {React.FunctionComponent}
 */
export const DeleteCommentDialog = ({ postId }) => {
  const { deleteComment } = useCommentData();
  const { refreshPostList } = usePostData();
  const { refreshCommentList } = useCommentListData();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteUserComment = () => {
    deleteComment(postId).then(() => {
      Promise.all([refreshPostList(), refreshCommentList()]);
    });
  };
  const DeleteButton = () => (
    <CustomButton tip='Delete Comment' onClick={handleOpen}>
      <Icon.DeleteOutline color='secondary' />
    </CustomButton>
  );
  if (!open) {
    return <DeleteButton />;
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

/**
 * @typedef IDeleteCommentDialogComponentProps
 * @property {string} postId
 */
