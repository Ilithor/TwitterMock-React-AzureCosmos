import React from 'react';
import dayjs from 'dayjs';

// MUI
import { CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import style from '../../../style';

// Icons
import * as Icon from '@material-ui/icons';

/** Displays individual notification content
 * @param {object} props
 * @param {object} props.classes
 * @param {string} props.postBody
 * @param {string} props.commentBody
 */
const NotificationCardContent = ({
  classes = {},
  notification = {},
  postBody,
  commentBody,
}) => {
  const makeNotificationContent = () => {
    if (notification?.type === 'like') {
      return <React.Fragment>{postBody}</React.Fragment>;
    }
    return <React.Fragment>{commentBody}</React.Fragment>;
  };
  const markNotificationNew = () => {
    if (notification?.read === false) {
      return (
        <React.Fragment>
          <Icon.FiberNew className={classes?.cornerIcon} />
        </React.Fragment>
      );
    }
  };
  const makeFromSenderType = () => {
    if (notification?.type === 'like') {
      return (
        <Typography color='primary'>
          {notification?.sender} liked your post!
        </Typography>
      );
    }
    return (
      <Typography color='primary'>
        {notification?.sender} commented on your post!
      </Typography>
    );
  };
  return (
    <CardContent className={classes?.content}>
      {markNotificationNew()}
      <span>{makeFromSenderType()}</span>
      <span>"{makeNotificationContent()}"</span>
      <br />
      <Typography variant='body2' color='textSecondary'>
        {dayjs(notification?.createdAt).fromNow()}
      </Typography>
    </CardContent>
  );
};

export default withStyles(style)(NotificationCardContent);
