import React from 'react';

// Components
import EditDetailsForm from './EditDetailsForm';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../../style';

/** Displays the dialog box to edit the user's details
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {boolean} props.open
 * @param {string} props.aboutMe
 * @param {string} props.website
 * @param {string} props.location
 * @param {React.ChangeEventHandler} props.handleChange
 * @param {React.ChangeEventHandler} props.handleSubmit
 * @param {React.ChangeEventHandler} props.handleClose
 */
const EditDetailsDisplay = ({
  classes = {},
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
        classes={classes}
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

export default withStyles(style)(EditDetailsDisplay);
