import React from 'react';

// Components
import { NotificationCardContent } from './NotificationCardContent';

// MUI
import { Card, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// API
import { useNotificationData } from '../notificationContext';

const useStyles = makeStyles({
  notificationCard: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
});

/** Displays icon appropriate to notification type
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {UserNotification} props.notification
 * @param {Post} props.post
 * @param {UserComment} props.comment
 */
export const NotificationCard = ({
  notification = {},
  post = {},
  comment = {},
}) => {
  const classes = useStyles();
  const { markNotificationRead } = useNotificationData();
  const notificationRead = () => {
    if (notification?.read === false) {
      markNotificationRead(notification);
    }
  };
  return (
    <Card className={classes?.notificationCard}>
      <CardActionArea onClick={notificationRead}>
        <NotificationCardContent
          notification={notification}
          postBody={post?.body}
          commentBody={comment?.body}
        />
      </CardActionArea>
    </Card>
  );
};
