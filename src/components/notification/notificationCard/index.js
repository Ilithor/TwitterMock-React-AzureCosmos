import React from 'react';

// Components
import { NotificationCardContent } from './NotificationCardContent';

// MUI
import { Card } from '@material-ui/core';
import { useStyles } from '../notification.style';

/** Displays icon appropriate to notification type
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {UserNotification} props.notification
 * @param {Post} props.post
 * @param {UserComment} props.comment
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
