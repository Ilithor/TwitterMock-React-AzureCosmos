import React from 'react';

// Components
import CustomButton from '../../../util/CustomButton';
import { NewPostForm } from './NewPostForm';

// MUI
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
});

export const NewPostDisplay = ({
  open,
  handleClose,
  handleSubmit,
  error = {},
  handleChange,
  isLoading,
}) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <CustomButton
        tip='Close'
        onClick={handleClose}
        tipClassName={classes?.closeButton}
      >
        <CloseIcon />
      </CustomButton>
      <DialogTitle>Create a new post</DialogTitle>
      <DialogContent>
        <NewPostForm
          handleSubmit={handleSubmit}
          error={error}
          handleChange={handleChange}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
