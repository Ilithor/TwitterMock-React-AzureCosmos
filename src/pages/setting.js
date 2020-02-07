import React, { useState } from 'react';

// MUI
import { Button, Dialog, DialogTitle, TextField } from '@material-ui/core';
import { useStyles } from './page.style';

// Context
import { useDeleteUser } from '../components/profile/userContext';

/** Displays the settings page
 *
 * @type {React.FunctionComponent}
 */
export const SettingPage = () => {
  const classes = useStyles();
  const { deleteUser } = useDeleteUser();
  const [open, setOpen] = useState(false);
  const [handleToMatch, setHandleToMatch] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = event => {
    const { value } = event.target;
    setHandleToMatch(value);
  };
  const handle = handleToMatch;
  const handleSubmit = event => {
    event.preventDefault();
    deleteUser(handle);
  };
  const DeleteButton = () => (
    <Button
      onClick={handleOpen}
      variant='contained'
      className={classes?.createButton}
      color='primary'
    >
      Delete Account
    </Button>
  );
  if (!open) {
    return <DeleteButton />;
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
      <form onSubmit={handleSubmit}>
        <TextField
          name='userHandle'
          type='text'
          placeholder='Type your handle here to delete...'
          error={error?.userHandle ? true : false}
          helperText={error?.userHandle}
          className={classes?.textField}
          onChange={handleChange}
          fullWidth
        />
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes?.submitButton}
          disabled={isMatching}
        >
          Delete Account
        </Button>
      </form>
    </Dialog>
  );
};
