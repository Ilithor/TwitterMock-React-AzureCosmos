import React, { useState } from 'react';

// Components
import CustomButton from '../../../../util/CustomButton';

// MUI
import { Dialog, Button, DialogTitle, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// React
import { connect } from 'react-redux';
import { deleteUserPost } from '../../../../redux/actions/dataActions';

const useStyles = makeStyles({
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
});

/** Displays the dialog box to delete the user's post
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {string} props.postId
 * @param {any} props.deleteUserPost
 */
const DeletePostDialogView = ({ postId, deleteUserPost }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deletePost = () => {
    deleteUserPost(postId);
    setOpen(false);
  };
  const makeDeleteButton = () => (
    <CustomButton
      tip='Delete Post'
      onClick={handleOpen}
      btnClassName={classes.deleteButton}
    >
      <DeleteOutline color='secondary' />
    </CustomButton>
  );
  if (!open) {
    return makeDeleteButton();
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={deletePost} color='secondary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeletePostDialog = connect(
  null,
  { deleteUserPost }
)(DeletePostDialogView);
