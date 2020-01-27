import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

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
  /** @type {UseStateResult<_.Dictionary<User>>} */
  const [userList, setUserList] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoadingUserList, setIsLoadingUserList] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [isLoadingAuthenticated, setIsLoadingAuthenticated] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const getUserList = () => {
    if (!isLoadingUserList) {
      setIsLoadingUserList(true);
      fetchUtil.user
        .fetchUserList()
        .then(res => {
          setUserList(_.keyBy(res.data, 'handle'));
        })
        .catch(err => setUserError(err))
        .finally(() => {
          setIsLoadingUserList(false);
        });
    }
  };

  const getCurrentUserData = async userHandle => {
    if (!!userHandle && !isLoadingUserData) {
      setIsLoadingUserData(true);
      await fetchUtil.user
        .getUserData(userHandle)
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

  const getAuthenticated = () => {
    if (
      !!localStorage?.Token &&
      !!localStorage?.Handle &&
      !isLoadingAuthenticated
    ) {
      setIsLoadingAuthenticated(true);
      const decodedToken = jwtDecode(localStorage?.Token);
      if (decodedToken?.exp * 1000 < Date.now()) {
        localStorage.removeItem('Token');
        localStorage.removeItem('Handle');
        delete axios.defaults.headers.common['Authorization'];
        setisAuthenticated(false);
        window.location.href = '/login';
      } else {
        axios.defaults.headers.common['Authorization'] = localStorage?.Token;
        fetchUtil.user.getUserData(localStorage?.Handle);
        setisAuthenticated(true);
        setIsLoadingAuthenticated(false);
      }
    }
  };

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
    getUserList,
    getCurrentUserData,
    isLoadingUserList,
    setIsLoadingUserList,
    isLoadingUserData,
    loginUser,
    logoutUser,
    isLoadingLogin,
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

  const { userList, userError, getUserList, isLoadingUserList } = ctx;
  if (!userError && _.keys(userList)?.length === 0) {
    getUserList();
  }

  // What we want this consumer hook to actually return
  return { userList, userError, isLoadingUserList };
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
  if (!userError && !isAuthenticated) {
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
