import React, { useState } from 'react';

// Components
import CustomButton from '../../../../util/CustomButton';

// MUI
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../../style';

// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// React
import { connect } from 'react-redux';
import { deleteUserPost } from '../../../../redux/actions/dataActions';

/** Displays the dialog box to delete the user's post
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {string} props.postId
 * @param {any} props.deleteUserPost
 */
const DeletePostDialogView = ({ classes = {}, postId, deleteUserPost }) => {
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
)(withStyles(style)(DeletePostDialogView));
