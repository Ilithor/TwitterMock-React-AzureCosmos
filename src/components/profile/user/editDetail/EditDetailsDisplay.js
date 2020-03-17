import React from 'react';

// Components
import { EditDetailsForm } from './EditDetailsForm';

// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

/** Displays the dialog box to edit the user's details
 *
 * @type {IEditDetailsDisplayComponentProps}
 * @returns {React.FunctionComponent}
 */
export const EditDetailsDisplay = ({
  open,
  handleClose,
  aboutMe,
  handleChange,
  website,
  location,
  handleSubmit,
}) => (
  <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
    <DialogTitle>Edit your details</DialogTitle>
    <DialogContent>
      <EditDetailsForm
        aboutMe={aboutMe}
        handleChange={handleChange}
        website={website}
        location={location}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color='primary'>
        Cancel
      </Button>
      <Button onClick={handleSubmit} color='primary'>
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

/**
 * @typedef IEditDetailsDisplayComponentProps
 * @property {boolean} open
 * @property {string} aboutMe
 * @property {string} website
 * @property {string} location
 * @property {React.ChangeEventHandler} handleChange
 * @property {React.ChangeEventHandler} handleSubmit
 * @property {React.ChangeEventHandler} handleClose
 */
