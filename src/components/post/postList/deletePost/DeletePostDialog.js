import React, { useState } from 'react';

// Components
import { CustomButton } from '../../../../util/CustomButton';

// MUI
import { Dialog, Button, DialogTitle, DialogActions } from '@material-ui/core';
import { useStyles } from '../../post.style';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { usePostData } from '../../postContext';

/** Displays the dialog box to delete the user's post
 *
 * @type {IDeletePostDialogComponentProps}
 * @returns {React.FunctionComponent}
 */
export const DeletePostDialog = ({ postId }) => {
  const classes = useStyles();
  const { deletePost } = usePostData();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteUserPost = () => {
    deletePost(postId);
    setOpen(false);
  };
  const DeleteButton = () => (
    <CustomButton
      tip='Delete Post'
      onClick={handleOpen}
      btnClassName={classes?.deleteButton}
    >
      <Icon.DeleteOutline color='secondary' />
    </CustomButton>
  );
  if (!open) {
    return <DeleteButton />;
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={deleteUserPost} color='secondary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * @typedef IDeletePostDialogComponentProps
 * @property {string} postId
 */
