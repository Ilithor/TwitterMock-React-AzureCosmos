import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// MUI
import { Button, Dialog, DialogTitle, TextField } from '@material-ui/core';
import { useStyles } from './setting.style';

// Context
import { useSettingData, useValidationDeleteUser } from './settingContext';
import { useUserLogout } from '../profile/userContext';

/** Displays the dialog box to allow the user to delete their account
 *
 * @type {React.FunctionComponent}
 */
export const DeleteUser = () => {
  const classes = useStyles();
  const history = useHistory();
  const { settingError, setSettingError, deleteUser } = useSettingData();
  const { validationMatching, isMatching } = useValidationDeleteUser();
  const { logoutUser } = useUserLogout();
  const [open, setOpen] = useState(false);
  const [handleToMatch, setHandleToMatch] = useState('');

  const handle = handleToMatch;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = event => {
    const { name, value } = event.target;
    setHandleToMatch(validationMatching({ ...handleToMatch, [name]: value }));
  };
  const handleSubmit = event => {
    event.preventDefault();
    setOpen(false);
    deleteUser(handle)
      .then(() => {
        logoutUser();
        history.push('/');
      })
      .catch(err => {
        setSettingError(err);
      });
  };
  const DeleteButton = () => (
    <Button
      onClick={handleOpen}
      className={classes?.deleteAccount}
      variant='contained'
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
      <form onSubmit={handleSubmit} className={classes?.container}>
        <TextField
          name='userHandle'
          type='text'
          placeholder='Type your handle here to delete...'
          error={settingError?.userHandle ? true : false}
          helperText={settingError?.userHandle}
          className={classes?.textField}
          onChange={handleChange}
          fullWidth
        />
        <div className={classes?.break} />
        <Button
          onClick={handleClose}
          color='primary'
          className={classes?.cancelButton}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes?.submitButton}
          disabled={!isMatching}
        >
          Delete Account
        </Button>
      </form>
    </Dialog>
  );
};
