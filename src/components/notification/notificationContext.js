import React, { createContext, useContext, useState } from 'react';

const notificationContext = createContext();

const dummy = [
  {
    read: false,
    recipient: 'Mr. Bean',
    postId: '5dba1775baa0b750e44b828d',
    sender: 'Dr hax',
    type: 'like',
    typeId: '5e129f26fa8aec41ccb92659',
  },
];

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 */
export const NotificationProvider = ({ children }) => {
  // setting local state
  const [notificationList, setNotificationList] = useState(dummy);
  // passing state to value to be passed to provider
  const value = { notificationList };
  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  );
};

/** A hook for consuming our Notification context in a safe way
 *
 * @example //getting the notification list
 * import { useNotificationData } from 'notificationContext'
 * const { notificationList } = useNotificationData();
 */
export const useNotificationData = () => {
  // Destructuring value from provider
  const ctx = useContext(notificationContext);

  if (ctx === undefined) {
    throw new Error(
      'useNotificationData must be used within a NotificationProvider'
    );
  }
  const { notificationList } = ctx;

  // What we want this consumer hook to actually return
  return { notificationList };
};
