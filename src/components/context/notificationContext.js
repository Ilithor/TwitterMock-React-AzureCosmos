import React, { createContext, useContext, useState } from 'react';

/** @type {React.Context<{notificationList:Notification[],notificationError:Error,getData:()=>void}>} */
const notificationContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @param {()=>Promise<import('axios').AxiosResponse<Notification[]>>} props.getNotificationList
 */
export const NotificationProvider = ({ children, getNotificationList }) => {
  /** @type {Notification[]} */
  const defaultState = [];
  // setting local state
  const [notificationList, setNotificationList] = useState(defaultState);
  const [notificationError, setnotificationError] = useState();

  const getData = () => {
    // Fetch list of notifications
    getNotificationList()
      .then(response => {
        setNotificationList(response.data);
      })
      .catch(err => setnotificationError(err));
  };

  // passing state to value to be passed to provider
  const value = {
    notificationList,
    getData,
    notificationError,
  };
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
 * @returns {Notification[]}
 */
export const useNotificationData = () => {
  // Destructuring value from provider
  const ctx = useContext(notificationContext);

  if (ctx === undefined) {
    throw new Error(
      'useNotificationData must be used within a NotificationProvider'
    );
  }
  const { notificationList, getData, notificationError } = ctx;
  if (
    !notificationError &&
    (!notificationList || notificationList?.length < 1)
  ) {
    getData();
  }

  // What we want this consumer hook to actually return
  return { notificationList, notificationError };
};

/**
 * @typedef Notification
 * @property {string} postId
 * @property {string} sender
 * @property {string} type
 * @property {string} _id
 */
