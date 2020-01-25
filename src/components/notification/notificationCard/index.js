import React from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { NotificationCardContent } from './NotificationCardContent';

// MUI
import { Card, CardActionArea } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import style from '../../../style';

// API
import { markNotificationRead } from '../../../util/fetch/user';

/** Displays icon appropriate to notification type
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {UserNotification} props.notification
 * @param {Post} props.post
 * @param {UserComment} props.comment
 */
export const NotificationCardView = ({
  classes = {},
  notification = {},
  post = {},
  comment = {},
}) => {
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
          classes={classes}
          notification={notification}
          postBody={post.body}
          commentBody={comment.body}
        />
      </CardActionArea>
    </Card>
  );
};

export const NotificationCard = withStyles(style)(NotificationCardView);
