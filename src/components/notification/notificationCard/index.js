import React from 'react';

// Components
import { NotificationCardContent } from './NotificationCardContent';

// MUI
import { Card } from '@material-ui/core';
import { useStyles } from '../notification.style';

/** Displays icon appropriate to notification type
 *
 * @type {INotificationCardComponentProps}
 * @returns {React.FunctionComponent}
 */
export const NotificationCard = ({ notification, post, comment }) => {
  const classes = useStyles();
  return (
    <Card className={classes?.notificationCard}>
      <NotificationCardContent
        notification={notification}
        postBody={post?.body}
        commentBody={comment?.body}
      />
    </Card>
  );
};

/**
 * @typedef INotificationCardComponentProps
 * @property {UserNotification} notification
 * @property {Post} post
 * @property {UserComment} comment
 */
