import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';
import * as fetchUtil from '../../../util/fetch';
import { useQueryGate } from '../../../util/queryGate';

/** @type {React.Context<UserListContextProps>} */
const userListContext = createContext();

/**
 * @typedef UserListContextProps
 * @property {Error} userListError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setUserListError
 * @property {boolean} isLoadingUserList
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingUserList
 * @property {_.Dictionary<UserData>} userList
 * @property {React.Dispatch<React.SetStateAction<_.Dictionary<UserData>>>} setUserList
 * @property {Date} lastRefreshUserList
 * @property {React.Dispatch<React.SetStateAction<Date>>} setLastRefreshUserList
 * @property {()=>void} refreshUserList
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @type {React.FunctionComponent}
 */
export const UserListProvider = ({ children }) => {
  const [userListError, setUserListError] = useState();
  const [isLoadingUserList, setIsLoadingUserList] = useState(false);
  const [userList, setUserList] = useState();
  const [lastRefreshUserList, setLastRefreshUserList] = useState();
  const gate = useQueryGate();

  /** Refreshes the user list
   *
   * @returns {Promise}
   */
  const refreshUserList = async () => {
    if (await gate.allowQuery(refreshUserList.name)) {
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
          .finally(() => setIsLoadingUserList(false));
      }
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

/**
 * @typedef UseUserListDataResult
 * @property {Error} userListError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setUserListError
 * @property {boolean} isLoadingUserList
 * @property {_.Dictionary<UserData>} userList
 * @property {()=>void} refreshUserList
 */

/** A hook for consuming our User context in a safe way
 *
 * @example //getting the user list
 * import { useUserListData } from 'userListContext'
 * const { userList } = useUserListData();
 * @returns {UseUserListDataResult}
 */
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
    !userListError &&
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
