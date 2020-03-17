import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import * as fetchUtil from '../../util/fetch';

/** @type {React.Context<{notificationList:Notification[],notificationError:Error,getData:()=>void}>} */
const notificationContext = createContext();

/**
 * @typedef NotificationContextProps
 * @property {_.Dictionary<Notification>} notificationList
 * @property {React.Dispatch<React.SetStateAction<_.Dictionary<Notification>>>} setNotificationList
 * @property {Error} notificationError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setNotificationError
 * @property {Date} lastRefreshNotificationList
 * @property {React.Dispatch<React.SetStateAction<Date>>} setLastRefreshNotificationList
 * @property {boolean} isLoadingNotificationList
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingNotificationList
 * @property {boolean} isLoadingMarkNotificationRead
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingMarkNotificationRead
 * @property {boolean} isLoadingDeleteNotification
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingDeleteNotification
 * @property {()=>void} refreshNotificationList
 * @property {(notification:Notification)=>void} markNotificationRead
 * @property {(notificationId:string)=>void} deleteNotification
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @type {INotificationProviderComponentProps}
 * @returns {React.FunctionComponent}
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
  const [isLoadingNotificationList, setIsLoadingNotificationList] = useState(
    false
  );
  const [
    isLoadingMarkNotificationRead,
    setIsLoadingMarkNotificationRead,
  ] = useState(false);
  const [
    isLoadingDeleteNotification,
    setIsLoadingDeleteNotification,
  ] = useState(false);

  /** Refreshes the user's notification list
   *
   * @returns {Promise}
   */
  const refreshNotificationList = async () => {
    if (!isLoadingNotificationList) {
      setIsLoadingNotificationList(true);
      setLastRefreshNotificationList(Date.now());
      // Fetch list of notifications
      await fetchUtil.user
        .fetchNotificationList()
        .then(res => {
          if (Array.isArray(res?.data)) {
            setNotificationList(_.keyBy(res?.data, 'notificationId'));
          } else {
            setNotificationError(res?.data);
          }
        })
        .catch(err => {
          setNotificationError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingNotificationList(false);
          return;
        });
    }
  };

  /** Marks the provided notification as read
   *
   * @param {Notification} notification
   * @returns {Promise}
   */
  const markNotificationRead = async notification => {
    if (!isLoadingMarkNotificationRead) {
      setIsLoadingMarkNotificationRead(true);
      await fetchUtil.user
        .markNotificationRead(notification?.notificationId)
        .then(async res => {
          if (res?.data === true) {
            await refreshNotificationList();
          } else {
            setNotificationError(res?.data);
          }
        })
        .catch(err => {
          setNotificationError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingMarkNotificationRead(false);
          history.push(
            `/u/${notification?.recipient}/post/${notification?.postId}`
          );
          return;
        });
    }
  };

  /** Deletes a notification
   *
   * @param {string} notificationId
   * @returns {Promise}
   */
  const deleteNotification = async notificationId => {
    if (!isLoadingDeleteNotification) {
      setIsLoadingDeleteNotification(true);
      await fetchUtil.user
        .deleteNotification(notificationId)
        .then(async res => {
          if (res?.data === true) {
            await refreshNotificationList();
          } else {
            setNotificationError(res?.data);
          }
        })
        .catch(err => {
          setNotificationError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingDeleteNotification(false);
          return;
        });
    }
  };

  // passing state to value to be passed to provider
  const value = {
    notificationList,
    refreshNotificationList,
    notificationError,
    isLoadingNotificationList,
    setIsLoadingNotificationList,
    lastRefreshNotificationList,
    markNotificationRead,
    deleteNotification,
  };
  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  );
};

/**
 * @typedef UseNotificationDataResult
 * @property {_.Dictionary<Notification>} notificationList
 * @property {()=>void} refreshNotificationList,
 * @property {Error} notificationError,
 * @property {boolean} isLoadingNotificationList,
 * @property {(notification:Notification)=>void} markNotificationRead,
 * @property {(notificationId:string)=>void} deleteNotification,
 */

/** A hook for consuming our Notification context in a safe way
 *
 * @example //getting the notification list
 * import { useNotificationData } from 'notificationContext'
 * const { notificationList } = useNotificationData();
 * @returns {UseNotificationDataResult}
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
    isLoadingNotificationList,
    lastRefreshNotificationList,
    markNotificationRead,
    deleteNotification,
  } = ctx;
  if (
    !isLoadingNotificationList &&
    (!notificationList ||
      !lastRefreshNotificationList ||
      lastRefreshNotificationList + 600000 <= Date.now())
  ) {
    refreshNotificationList();
  }
  // What we want this consumer hook to actually return
  return {
    notificationList,
    refreshNotificationList,
    notificationError,
    isLoadingNotificationList,
    markNotificationRead,
    deleteNotification,
  };
};

/**
 * @typedef INotificationProviderComponentProps
 * @property {React.ReactChild} children
 */

/**
 * @typedef Notification
 * @property {string} notificationId
 * @property {Date} createdAt
 * @property {string} postId
 * @property {string} sender
 * @property {string} recipient
 * @property {string} type
 * @property {string} typeId
 * @property {boolean} read
 */
