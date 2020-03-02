import React from 'react';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

// Components
import { DeleteNotification } from './DeleteNotification';

// MUI
import { CardContent, Typography, CardActionArea } from '@material-ui/core';
import { useStyles } from '../notification.style';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useNotificationData } from '../notificationContext';

/** Displays individual notification content
 *
 * @type {INotificationCardContentComponentProps}
 * @returns {React.FunctionComponent}
 */
export const NotificationCardContent = ({
  notification,
  postBody,
  commentBody,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { markNotificationRead } = useNotificationData();
  const notificationRead = () => {
    if (notification?.read === false) {
      markNotificationRead(notification);
    } else {
      history.push(
        `/u/${notification?.recipient}/post/${notification?.postId}`
      );
    }
  };
  const NotificationContent = ({ type, postBody, commentBody }) => {
    if (type === 'like') {
      return <h2>"{postBody}"</h2>;
    }
    return <h2>"{commentBody}"</h2>;
  };
  const NotificationNew = ({ classes, read }) => {
    if (read === false) {
      return (
        <React.Fragment>
          <Icon.FiberNew className={classes?.cornerIcon} />
        </React.Fragment>
      );
    }
    return null;
  };
  const FromSenderType = ({ type, sender }) => {
    if (type === 'like') {
      return <Typography color='primary'>{sender} liked your post!</Typography>;
    }
    if (type === 'comment') {
      return (
        <Typography color='primary'>
          {sender} commented on your post!
        </Typography>
      );
    }
  };
  return (
    <CardContent className={classes?.content}>
      <div className={classes?.menu}>
        <NotificationNew read={notification?.read} />
        <DeleteNotification notification={notification} />
      </div>
      <CardActionArea onClick={notificationRead}>
        <FromSenderType
          type={notification?.type}
          sender={notification?.sender}
        />
        <NotificationContent
          type={notification?.type}
          postBody={postBody}
          commentBody={commentBody}
        />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(notification?.createdAt).fromNow()}
        </Typography>
      </CardActionArea>
    </CardContent>
  );
};

/**
 * @typedef INotificationCardContentComponentProps
 * @property {UserNotification} notification
 * @property {string} postBody
 * @property {string} commentBody
 */
