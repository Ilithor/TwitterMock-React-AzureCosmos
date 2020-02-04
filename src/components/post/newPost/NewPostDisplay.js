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
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {boolean} props.open
 * @param {React.ChangeEventHandler} props.handleClose
 * @param {React.ChangeEventHandler} props.handleSubmit
 * @param {Error} props.error
 * @param {React.ChangeEventHandler} props.handleChange
 * @param {boolean} props.isLoading
 */
export const NewPostDisplay = ({
  open,
  handleClose,
  handleSubmit,
  error,
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
