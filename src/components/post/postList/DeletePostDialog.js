import React from 'react';

// MUI
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

/** Displays the dialog box to delete the user's post
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {boolean} props.open
 * @param {React.ChangeEventHandler} props.handleClose
 * @param {any} props.deletePost
 */
const DeletePostDialog = ({ open, handleClose, deletePost }) => (
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

export default withStyles(style)(DeletePostDialog);
