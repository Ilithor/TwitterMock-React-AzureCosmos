import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';
import * as fetchUtil from '../../../util/fetch';

/** @type {React.Context<UserListContextProps>} */
const userListContext = createContext();

/**
 * @typedef UserListContextProps
 * @property {Error} userListError
 * @property {React.Dispatch} setUserListError
 * @property {boolean} isLoadingUserList
 * @property {_.Dictionary<User>} userList
 * @property {Date} lastRefreshUserList
 * @property {()=>void} refreshUserList
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 */
export const UserListProvider = ({ children }) => {
  const [userListError, setUserListError] = useState();
  const [isLoadingUserList, setIsLoadingUserList] = useState(false);
  const [lastRefreshUserList, setLastRefreshUserList] = useState();
  const [userList, setUserList] = useState();

  /** Refreshes the user list
   *
   * @returns {void|Error}
   */
  const refreshUserList = async () => {
    if (!isLoadingUserList) {
      setIsLoadingUserList(true);
      setLastRefreshUserList(Date.now());
      await fetchUtil.user
        .fetchUserList()
        .then(res => {
          if (Array.isArray(res?.data)) {
            setUserList(_.keyBy(res?.data, 'userHandle'));
          }
        })
        .catch(err => {
          setUserListError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingUserList(false);
          return;
        });
    }
  };

  const value = {
    userListError,
    setUserListError,
    isLoadingUserList,
    userList,
    lastRefreshUserList,
    refreshUserList,
  };

  return (
    <userListContext.Provider value={value}>
      {children}
    </userListContext.Provider>
  );
};

export const useUserListData = () => {
  const ctx = useContext(userListContext);

  if (ctx === undefined) {
    throw new Error('useUserListData must be used within a UserListProvider');
  }

  const {
    userListError,
    setUserListError,
    isLoadingUserList,
    userList,
    lastRefreshUserList,
    refreshUserList,
  } = ctx;

  if (
    !isLoadingUserList &&
    (!userList ||
      !lastRefreshUserList ||
      lastRefreshUserList + 600000 <= Date.now())
  ) {
    refreshUserList();
  }

  return {
    userListError,
    setUserListError,
    isLoadingUserList,
    userList,
    refreshUserList,
  };
};
