import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import * as fetchUtil from '../../util/fetch';

/** @type {React.Context<{userList:User[],userError:Error,getData:()=>void}} */
const userContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 * @param {object} props
 * @param {React.ReactChild} props.children
 */
export const UserProvider = ({ children }) => {
  const [userError, setUserError] = useState();
  const [lastRefreshUserList, setLastRefreshUserList] = useState();
  /** @type {UseStateResult<_.Dictionary<User>>} */
  const [userList, setUserList] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoadingUserList, setIsLoadingUserList] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [isLoadingAuthenticated, setIsLoadingAuthenticated] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const history = useHistory();

  const refreshUserList = async () => {
    if (!isLoadingUserList) {
      setIsLoadingUserList(true);
      await fetchUtil.user
        .fetchUserList()
        .then(async res => {
          await setUserList(_.keyBy(res.data, 'handle'));
        })
        .catch(err => setUserError(err))
        .finally(() => {
          setLastRefreshUserList(Date.now);
          setIsLoadingUserList(false);
        });
    }
  };

  const getCurrentUserData = async userHandle => {
    if (!!userHandle && !isLoadingUserData) {
      setIsLoadingUserData(true);
      await fetchUtil.user
        .fetchUserData(userHandle)
        .then(async res => {
          await setCurrentUser(res.data.user);
        })
        .catch(err => setUserError(err))
        .finally(() => {
          setIsLoadingUserData(false);
        });
    }
  };

  const loginUser = async userParam => {
    if (!!userParam && !isLoadingLogin) {
      setIsLoadingLogin(true);
      await fetchUtil.user
        .loginUser(userParam)
        .then(async res => {
          setAuthorizationHeader(res.data.token);
          setUserHandleHeader(res.data.handle);
        })
        .catch(err => setUserError(err))
        .finally(() => {
          setIsLoadingLogin(false);
        });
    }
  };

  const setAuthorizationHeader = token => {
    const Token = `Bearer ${token}`;
    localStorage.setItem('Token', Token);
    axios.defaults.headers.common['Authorization'] = Token;
  };

  const setUserHandleHeader = handle => {
    localStorage.setItem('Handle', handle);
  };

  const getAuthenticated = () =>
    new Promise(async (resolve, reject) => {
      if (
        localStorage?.Token &&
        localStorage?.Handle &&
        !isLoadingAuthenticated
      ) {
        setIsLoadingAuthenticated(true);
        const decodedToken = jwtDecode(localStorage?.Token);
        if (decodedToken?.exp * 1000 < Date.now()) {
          localStorage.removeItem('Token');
          localStorage.removeItem('Handle');
          delete axios.defaults.headers.common['Authorization'];
          setisAuthenticated(false);
          history.push('/login');
        } else {
          axios.defaults.headers.common['Authorization'] = localStorage?.Token;
          await fetchUtil.user
            .fetchUserData(localStorage?.Handle)
            .then(res => {
              setCurrentUser(res.data);
              setisAuthenticated(true);
            })
            .catch(err => {
              setUserError(err);
              reject(err);
            })
            .finally(() => {
              setIsLoadingAuthenticated(false);
            });
        }
      }
    });

  const logoutUser = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Handle');
    delete axios.defaults.headers.common['Authorization'];
    setisAuthenticated(false);
  };
  // Passing state to value to be passed to provider
  const value = {
    isAuthenticated,
    isLoadingAuthenticated,
    getAuthenticated,
    userList,
    currentUser,
    userError,
    refreshUserList,
    getCurrentUserData,
    isLoadingUserList,
    setIsLoadingUserList,
    isLoadingUserData,
    loginUser,
    logoutUser,
    isLoadingLogin,
    lastRefreshUserList,
  };
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

/** A hook for consuming our User context in a safe way
 * @example //getting the user list
 * import { useUserData } from 'userContext'
 * const { userList } = useUserData();
 * @returns {User[]}
 */
export const useUserListData = () => {
  // Destructuring value from provider
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useUserListData must be used within a UserProvider');
  }

  const {
    userList,
    userError,
    refreshUserList,
    isLoadingUserList,
    lastRefreshUserList,
  } = ctx;

  if (
    !isLoadingUserList &&
    (_.keys(userList).length === 0 ||
      lastRefreshUserList === null ||
      lastRefreshUserList >= Date.now + 600)
  ) {
    refreshUserList();
  }
  // What we want this consumer hook to actually return
  return { refreshUserList, userList, userError, isLoadingUserList };
};

export const useUserData = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useUserData must be used within a UserProvider');
  }

  const { user, userError, isLoadingUserData } = ctx;

  return { user, userError, isLoadingUserData };
};

export const useCurrentUserData = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useCurrentUserData must be used within a UserProvider');
  }

  const {
    isLoadingUserData,
    currentUser,
    getCurrentUserData,
    userError,
    isAuthenticated,
  } = ctx;

  return {
    isLoadingUserData,
    currentUser,
    getCurrentUserData,
    isAuthenticated,
    userError,
  };
};

export const useUserAuthenticationData = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error(
      'useUserAuthenticationData must be used within a UserProvider'
    );
  }

  const {
    isAuthenticated,
    userError,
    getAuthenticated,
    isLoadingAuthenticated,
  } = ctx;

  if (!isLoadingAuthenticated && !isAuthenticated) {
    getAuthenticated();
  }

  return {
    getAuthenticated,
    isAuthenticated,
    userError,
    isLoadingAuthenticated,
  };
};

export const useUserLoginData = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useUserLoginData must be used within a UserProvider');
  }

  const { currentUser, loginUser, userError, user, isLoadingLogin } = ctx;

  return { user, loginUser, userError, isLoadingLogin, currentUser };
};

export const useUserLogout = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useUserLogout muse be used within a UserProvider');
  }

  const { logoutUser } = ctx;

  return { logoutUser };
};
