import React from 'react';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
      <form>
        <TextField
          name='aboutMe'
          type='text'
          label='AboutMe'
          multiline
          rows='3'
          placeholder='A short bio about yourself'
          className={classes.textField}
          value={aboutMe}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name='website'
          type='text'
          label='Website'
          placeholder='Your personal website'
          className={classes.textField}
          value={website}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name='location'
          type='text'
          label='Location'
          placeholder='Where you live'
          className={classes.textField}
          value={location}
          onChange={handleChange}
          fullWidth
        />
      </form>
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

export default EditDetailsDisplay;
