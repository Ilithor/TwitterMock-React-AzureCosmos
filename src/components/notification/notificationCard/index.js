import React from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { NotificationCardContent } from './NotificationCardContent';

// MUI
import { Card, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// API
import { markNotificationRead } from '../../../util/fetch/user';

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
  const history = useHistory();
  const notificationRead = () => {
    if (notification?.read === false) {
      markNotificationRead(notification?._id).then(() => {
        notification.read = true;
        history.push(
          `/u/${notification?.recipient}/post/${notification?.postId}`
        );
      });
    }
    history.push(`/u/${notification?.recipient}/post/${notification?.postId}`);
  };
  return (
    <Card className={classes?.notificationCard}>
      <CardActionArea onClick={notificationRead}>
        <NotificationCardContent
          notification={notification}
          postBody={post.body}
          commentBody={comment.body}
        />
      </CardActionArea>
    </Card>
  );
};
