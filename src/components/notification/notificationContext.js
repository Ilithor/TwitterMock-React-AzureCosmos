import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import * as fetchUtil from '../../util/fetch';

/** @type {React.Context<{notificationList:Notification[],notificationError:Error,getData:()=>void}>} */
const notificationContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 */
export const NotificationProvider = ({ children }) => {
  /** @type {UseStateResult<_.Dictionary<Notification>>} */
  const history = useHistory();
  const [notificationList, setNotificationList] = useState();
  const [notificationError, setNotificationError] = useState();
  const [
    lastRefreshNotificationList,
    setLastRefreshNotificationList,
  ] = useState();
  const [isLoadingNotifcationList, setIsLoadingNotificationList] = useState(
    false
  );
  const [
    isLoadingMarkNotificationRead,
    setIsLoadingMarkNotificationRead,
  ] = useState(false);

  /** Refreshes the user's notification list
   *
   * @returns {void, Error}
   */
  const refreshNotificationList = async () => {
    if (!isLoadingNotifcationList) {
      setIsLoadingNotificationList(true);
      // Fetch list of notifications
      await fetchUtil.user
        .fetchNotificationList()
        .then(res => {
          if (Array.isArray(res?.data)) {
            setNotificationList(_.keyBy(res?.data, 'recipient'));
          } else {
            setNotificationError(res?.data);
          }
        })
        .catch(err => {
          setNotificationError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setLastRefreshNotificationList(Date.now);
          setIsLoadingNotificationList(false);
          return;
        });
    }
  };

  /** Marks the provided notification as read
   *
   * @param {object} notification
   * @returns {void, Error}
   */
  const markNotificationRead = notification =>
    new Promise((resolve, reject) => {
      if (!isLoadingMarkNotificationRead) {
        setIsLoadingMarkNotificationRead(true);
        fetchUtil.user
          .markNotificationRead(notification?.notificationId)
          .then(() => {
            refreshNotificationList();
          })
          .catch(err => {
            setNotificationError(err);
            reject(err);
          })
          .finally(() => {
            setIsLoadingMarkNotificationRead(false);
            history.pushState(
              `/u/${notification?.recipient}/post/${notification?.postId}`
            );
            resolve();
          });
      }
    });

  // passing state to value to be passed to provider
  const value = {
    notificationList,
    refreshNotificationList,
    notificationError,
    isLoadingNotifcationList,
    setIsLoadingNotificationList,
    lastRefreshNotificationList,
    markNotificationRead,
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
  const {
    notificationList,
    refreshNotificationList,
    notificationError,
    isLoadingNotifcationList,
    lastRefreshNotificationList,
    markNotificationRead,
  } = ctx;

  if (
    !isLoadingNotifcationList &&
    (!lastRefreshNotificationList ||
      lastRefreshNotificationList + 600 <= Date.now)
  ) {
    refreshNotificationList();
  }
  // What we want this consumer hook to actually return
  return {
    notificationList,
    refreshNotificationList,
    notificationError,
    isLoadingNotifcationList,
    markNotificationRead,
  };
};

/**
 * @typedef Notification
 * @property {String} notificationId
 * @property {Date} createdAt
 * @property {String} postId
 * @property {String} sender
 * @property {String} recipient
 * @property {String} type
 * @property {String} typeId
 * @property {Boolean} read
 */
