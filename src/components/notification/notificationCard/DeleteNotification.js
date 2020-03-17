import React, { useState } from 'react';

// Components
import { CustomButton } from '../../../util/CustomButton';

// MUI
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useNotificationData } from '../notificationContext';

/** Displays a dialog box for notification deletion
 *
 * @type {IDeleteNotificationComponentProps}
 * @returns {React.FunctionComponent}
 */
export const DeleteNotification = ({ notification }) => {
  const { refreshNotificationList, deleteNotification } = useNotificationData();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteUserNotification = () => {
    deleteNotification(notification?.notificationId).then(() => {
      refreshNotificationList();
    });
  };
  const DeleteButton = () => (
    <CustomButton tip='Delete Notification' onClick={handleOpen}>
      <Icon.DeleteOutline color='secondary' />
    </CustomButton>
  );
  if (!open) {
    return <DeleteButton />;
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>
        Are you sure you want to delete this notification?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={deleteUserNotification} color='secondary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * @typedef IDeleteNotificationComponentProps
 * @property {Notification} notification
 */

/**
 * @typedef Notification
 * @property {boolean} read
 * @property {string} recipient
 * @property {string} postId
 * @property {string} sender
 * @property {string} type
 * @property {string} typeId
 */
