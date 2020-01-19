import React from 'react';

export const Notification = () => {
  const notificationList = [
    {
      read: false,
      recipient: 'Mr. Bean',
      postId: '5dba1775baa0b750e44b828d',
      sender: 'Dr hax',
      type: 'like',
      typeId: '5e129f26fa8aec41ccb92659',
    },
  ];
  return <div>{JSON.stringify(notificationList, null, 2)}</div>;
};
