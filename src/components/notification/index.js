import React from 'react';
import { useNotificationData } from './notificationContext';

export const Notification = () => {
  const { notificationList } = useNotificationData();
  return <div>{JSON.stringify(notificationList, null, 2)}</div>;
};
