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
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {boolean} props.open
 * @param {string} props.aboutMe
 * @param {string} props.website
 * @param {string} props.location
 * @param {React.ChangeEventHandler} props.handleChange
 * @param {React.ChangeEventHandler} props.handleSubmit
 * @param {React.ChangeEventHandler} props.handleClose
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
