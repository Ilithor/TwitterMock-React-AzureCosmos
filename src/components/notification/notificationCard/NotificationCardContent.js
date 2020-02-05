import React from 'react';
import dayjs from 'dayjs';

// MUI
import { CardContent, Typography } from '@material-ui/core';
import { useStyles } from '../notification.style';

// Icons
import * as Icon from '@material-ui/icons';

/** Displays individual notification content
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.notification
 * @param {string} props.postBody
 * @param {string} props.commentBody
 */
export const NotificationCardContent = ({
  notification,
  postBody,
  commentBody,
}) => {
  const classes = useStyles();
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
      <NotificationNew read={notification?.read} />
      <FromSenderType type={notification?.type} sender={notification?.sender} />
      <NotificationContent
        type={notification?.type}
        postBody={postBody}
        commentBody={commentBody}
      />
      <Typography variant='body2' color='textSecondary'>
        {dayjs(notification?.createdAt).fromNow()}
      </Typography>
    </CardContent>
  );
};
