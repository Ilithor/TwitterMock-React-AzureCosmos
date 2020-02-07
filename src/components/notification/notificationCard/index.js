import React from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { NotificationCardContent } from './NotificationCardContent';

// MUI
import { Card, CardActionArea } from '@material-ui/core';
import { useStyles } from '../notification.style';

// API
import { useNotificationData } from '../notificationContext';

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
  const history = useHistory();
  const { markNotificationRead } = useNotificationData();
  const notificationRead = () => {
    if (notification?.read === false) {
      markNotificationRead(notification);
    } else {
      history.push(`/u/${notification?.recipient}/post/${notification?.postId}`);
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
