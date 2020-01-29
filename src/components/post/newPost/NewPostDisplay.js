import React from 'react';

// Components
import { NewPostForm } from './NewPostForm';
import { CustomButton } from '../../../util/CustomButton';

// MUI
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

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
        <Icon.Close />
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
