import React from 'react';

// Components
import { NewPostForm } from './NewPostForm';
import { CustomButton } from '../../../util/CustomButton';

// MUI
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useStyles } from '../post.style';

// Icons
import * as Icon from '@material-ui/icons';

/** Displays the dialog box that allows the user to create a post
 *
 * @type {INewPostDisplayComponentProps}
 * @returns {React.FunctionComponent}
 */
export const NewPostDisplay = ({
  open,
  isLoading,
  error,
  handleClose,
  handleSubmit,
  handleChange,
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

/**
 * @typedef INewPostDisplayComponentProps
 * @property {boolean} open
 * @property {boolean} isLoading
 * @property {Error} error
 * @property {React.ChangeEventHandler} handleClose
 * @property {React.ChangeEventHandler} handleSubmit
 * @property {React.ChangeEventHandler} handleChange
 */
