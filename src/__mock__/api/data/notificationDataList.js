/** @type {NotificationData[]} */
export const dummyNotificationList = [
  {
    read: false,
    recipient: 'test',
    postId: '12345',
    sender: 'test2',
    type: 'like',
    typeId: '12345',
  },
  {
    read: true,
    recipient: 'test2',
    postId: '23456',
    sender: 'test3',
    type: 'comment',
    typeId: '12345',
  },
  {
    read: false,
    recipient: 'test3',
    postId: '34567',
    sender: 'test',
    type: 'like',
    typeId: '67890',
  },
];
