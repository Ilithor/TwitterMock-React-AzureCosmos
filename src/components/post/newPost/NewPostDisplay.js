import React from 'react';

// Components
import CustomButton from '../../../util/CustomButton';
import NewPostForm from './NewPostForm';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style';

// Icons
import CloseIcon from '@material-ui/icons/Close';

const NewPostDisplay = ({
  open,
  handleClose,
  classes = {},
  handleSubmit,
  error = {},
  handleChange,
  isLoading,
}) => (
  <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
    <CustomButton
      tip='Close'
      onClick={handleClose}
      tipClassName={classes.closeButton}
    >
      <CloseIcon />
    </CustomButton>
    <DialogTitle>Create a new post</DialogTitle>
    <DialogContent>
      <NewPostForm
        handleSubmit={handleSubmit}
        error={error}
        classes={classes}
        handleChange={handleChange}
        isLoading={isLoading}
      />
    </DialogContent>
  </Dialog>
);

export default withStyles(style)(NewPostDisplay);
