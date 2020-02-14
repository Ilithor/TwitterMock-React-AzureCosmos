import React, { createContext, useContext, useState } from 'react';
import * as fetchUtil from '../../util/fetch';

/** @type {React.Context<CurrentUserContextProps>} */
const currentUserContext = createContext();

/**
 * @typedef CurrentUserContextProps
 * @property {Error} currentUserError
 * @property {React.Dispatch} setCurrentUserError
 * @property {boolean} isLoadingCurrentUser
 * @property {React.Dispatch} setIsLoadingCurrentUser
 * @property {Date} lastFetchCurrentUser
 * @property {React.Dispatch} setLastFetchCurrentUser
 * @property {User} currentUser
 * @property {React.Dispatch} setCurrentUser
 * @property {()=>void} fetchCurrentUser
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 */
export const CurrentUserProvider = ({ children }) => {
  const [currentUserError, setCurrentUserError] = useState();
  const [isLoadingCurrentUser, setIsLoadingCurrentUser] = useState(false);
  const [lastFetchCurrentUser, setLastFetchCurrentUser] = useState();
  const [currentUser, setCurrentUser] = useState();

  /** Attempts to fetch the current user data
   *
   * @returns {void|Error}
   */
  const fetchCurrentUser = async () => {
    if (localStorage?.Handle && !isLoadingCurrentUser) {
      setIsLoadingCurrentUser(true);
      await fetchUtil.user
        .fetchUserData(localStorage?.Handle)
        .then(res => {
          if (res?.data) {
            setCurrentUser(res?.data?.user);
          } else {
            setCurrentUserError(res?.data);
          }
        })
        .catch(err => {
          setCurrentUserError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setLastFetchCurrentUser(Date.now());
          setIsLoadingCurrentUser(false);
          return;
        });
    }
  };

  const value = {
    currentUserError,
    setCurrentUserError,
    isLoadingCurrentUser,
    currentUser,
    fetchCurrentUser,
    lastFetchCurrentUser,
  };

  return (
    <currentUserContext.Provider value={value}>
      {children}
    </currentUserContext.Provider>
  );
};

/** A hook for consuming our current user context in a safe way
 *
 * @example //getting the current user
 * import { useCurrentUserData } from 'currentUserContext'
 * const { currentUser } = useCurrentUserData();
 * @returns {useCurrentUserDataResult}
 */
export const useCurrentUserData = () => {
  const ctx = useContext(currentUserContext);

  if (ctx === undefined) {
    throw new Error('useCurrentUserData must be within a CurrentUserProvider');
  }

  const {
    isLoadingCurrentUser,
    currentUser,
    fetchCurrentUser,
    currentUserError,
    setCurrentUserError,
    lastFetchCurrentUser,
  } = ctx;

  if (
    !isLoadingCurrentUser &&
    (!currentUser ||
      !lastFetchCurrentUser ||
      lastFetchCurrentUser + 600000 <= Date.now())
  ) {
    fetchCurrentUser();
  }

  return {
    isLoadingCurrentUser,
    currentUser,
    fetchCurrentUser,
    currentUserError,
    setCurrentUserError,
  };
};

/**
 * @typedef useCurrentUserDataResult
 * @property {boolean} [isLoadingCurrentUser]
 * @property {User} [currentUser]
 * @property {()=>void} fetchCurrentUser
 * @property {Error} [currentUserError]
 * @property {React.Dispatch} [setCurrentUserError]
 */
