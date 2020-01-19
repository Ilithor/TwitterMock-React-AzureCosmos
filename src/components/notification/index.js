import React from 'react';
import { useNotificationData, Notification } from './notificationContext';
import * as Icon from '@material-ui/icons';
import { Card } from '@material-ui/core';

/** Displays icon appropriate to notification type
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {Notification} props.notification
 */
export const NotificationCard = ({ classes, notification }) => {
  let typeDisp;
  switch (notification.type) {
    case 'like':
      typeDisp = (
        <React.Fragment>
          <Icon.FavoriteSharp />
          <Icon.FavoriteTwoTone />
          <Icon.Favorite />
        </React.Fragment>
      );
      break;
    case 'comment':
      typeDisp = (
        <React.Fragment>
          <Icon.Comment />
        </React.Fragment>
      );
      break;
    default:
      typeDisp = notification.type;
  }

  return (
    <Card className={classes?.card}>
      {notification.postId}
      <br />
      {notification.sender}
      <br />
      {typeDisp}
    </Card>
  );
};

export const NotificationPanel = ({ classes }) => {
  const { notificationList, notificationError } = useNotificationData();

  const Content = () => {
    if (notificationList?.length > 0) {
      return notificationList?.map(doc => (
        <NotificationCard
          key={`notification-${doc._id}`}
          classes={classes}
          notification={doc}
        />
      ));
    }
    return (
      <React.Fragment>
        <h1>
          <span role='img' aria-label=''>
            😱😱😱
          </span>
          No more notifications!!!
        </h1>
        <p>Go make some friends, nerd!!!</p>
      </React.Fragment>
    );
  };

  return (
    <div>
      <h1>Notifications! 💬</h1>
      <hr />
      <Content />
    </div>
  );
};
