import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import * as fetchUtil from '../../util/fetch';

/** @type {React.Context<{userList:User[],userError:Error,getData:()=>void}>} */
const userContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 * @param {Object} props
 * @param {React.ReactChild} props.children
 */
export const UserProvider = ({ children }) => {
  const [userError, setUserError] = useState();
  const [lastRefreshUserList, setLastRefreshUserList] = useState();
  /** @type {UseStateResult<_.Dictionary<User>>} */
  const [userList, setUserList] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoadingUserList, setIsLoadingUserList] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [isLoadingEditUserDetail, setIsLoadingEditUserDetail] = useState(false);
  const [isLoadingAuthenticated, setIsLoadingAuthenticated] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);
  const history = useHistory();

  /** Refreshes the list of users
   *
   * @returns {void | Error}
   */
  const refreshUserList = async () => {
    if (!isLoadingUserList) {
      setIsLoadingUserList(true);
      await fetchUtil.user
        .fetchUserList()
        .then(res => {
          setUserList(_.keyBy(res.data, 'userHandle'));
        })
        .catch(err => {
          setUserError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setLastRefreshUserList(Date.now);
          setIsLoadingUserList(false);
          return Promise.resolve();
        });
    }
  };

  /** Retrieves the currently logged in user's info
   *
   * @returns {void | Error}
   */
  const getCurrentUserData = async () => {
    if (localStorage?.Handle && !isLoadingUserData) {
      setIsLoadingUserData(true);
      await fetchUtil.user
        .fetchUserData(localStorage?.Handle)
        .then(res => {
          setCurrentUser(res?.data?.user);
        })
        .catch(err => {
          setUserError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingUserData(false);
          return Promise.resolve();
        });
    }
  };

  /** Updates the user's info with the provided data
   * 
   * @param {object} userDetail
   * @returns {void | Error}
   */
  const editUserDetail = async userDetail => {
    if (userDetail && !isLoadingEditUserDetail) {
      setIsLoadingEditUserDetail(true);
      await fetchUtil.user
        .editUserDetail(userDetail)
        .then(async success => {
          if (success) {
            getCurrentUserData();
          }
        })
        .catch(err => {
          setUserError(err);
          Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingEditUserDetail(false);
          Promise.resolve();
        });
    }
  };

  /** Updates the user's profile image
   * 
   * @param {object} formData
   * @returns {void | Error}
   */
  const uploadImage = async formData => {
    if (formData && localStorage?.Handle && !isLoadingUploadImage) {
      setIsLoadingUploadImage(true);
      await fetchUtil.user
        .uploadImage(formData)
        .then(async success => {
          if (success) {
            await getCurrentUserData();
            await refreshUserList();
          }
        })
        .catch(err => {
          setUserError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingUploadImage(false);
          return Promise.resolve();
        });
    }
  };

  /** Creates a new user
   * 
   * @param {object} userParam
   * @returns {void | Error}
   */
  const registerUser = async userParam => {
    if (!isLoadingRegister) {
      setIsLoadingRegister(true);
      if (
        !userParam.email ||
        !userParam.password ||
        !userParam.userHandle ||
        !userParam.confirmPassword
      ) {
        setIsLoadingRegister(false);
        return Promise.reject(await checkRegisterIfUndefined(userParam));
      } else {
        await fetchUtil.user
          .registerUser(userParam)
          .then(async res => {
            if (!res?.data?.token) {
              return Promise.reject(res.data);
            }
            setAuthorizationHeader(res?.data?.token);
            setUserHandleHeader(res?.data?.user?.userHandle);
            await getAuthenticated();
          })
          .catch(err => {
            return Promise.reject(err);
          })
          .finally(() => {
            setIsLoadingRegister(false);
            return Promise.resolve();
          });
      }
    }
  };

  /** Attempts to login with the provided login info
   * 
   * @param {object} userParam
   * @returns {void | Error}
   */
  const loginUser = async userParam => {
    if (!isLoadingLogin) {
      setIsLoadingLogin(true);
      if (!userParam?.email || !userParam?.password) {
        setIsLoadingLogin(false);
        return Promise.reject(await checkLoginIfUndefined(userParam));
      }
      await fetchUtil.user
        .loginUser(userParam)
        .then(async res => {
          setAuthorizationHeader(res?.data?.token);
          setUserHandleHeader(res?.data?.userHandle);
          await getAuthenticated();
        })
        .catch(err => {
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingLogin(false);
          return Promise.resolve();
        });
    }
  };

  /** Checks if the params are undefined
   * 
   * @param {object} userParam
   * @returns {object}
   */
  const checkLoginIfUndefined = userParam => {
    let err = {};
    if (!userParam.email) {
      err = { ...err, email: 'Must not be empty' };
    }
    if (!userParam.password) {
      err = { ...err, password: 'Must not be empty' };
    }
    return err;
  };

  /** Checks if the params are undefined
   * 
   * @param {object} userParam
   * @returns {object}
   */
  const checkRegisterIfUndefined = userParam => {
    let err = {};
    if (!userParam.email) {
      err = { ...err, email: 'Must not be empty' };
    }
    if (!userParam.userHandle) {
      err = { ...err, userHandle: 'Must not be empty' };
    }
    if (!userParam.password) {
      err = { ...err, password: 'Must not be empty' };
    }
    if (!userParam.confirmPassword) {
      err = { ...err, confirmPassword: 'Must not be empty' };
    }
    return err;
  };

  /** Sets the user token and authorization
   * 
   * @param {string} token 
   */
  const setAuthorizationHeader = token => {
    const Token = `Bearer ${token}`;
    localStorage.setItem('Token', Token);
    axios.defaults.headers.common['Authorization'] = Token;
  };

  /** Sets the user's handle in the local storage
   * 
   * @param {string} userHandle
   */
  const setUserHandleHeader = userHandle => {
    localStorage.setItem('Handle', userHandle);
  };

  /** Attempts to authenticated the user
   * 
   * @returns {void | Error}
   */
  const getAuthenticated = async () => {
    if (
      localStorage?.Token &&
      localStorage?.Handle &&
      !isLoadingAuthenticated &&
      !isAuthenticated
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
        await getCurrentUserData()
          .then(() => {
            setisAuthenticated(true);
          })
          .catch(err => {
            setUserError(err);
            return Promise.reject(err);
          })
          .finally(() => {
            setIsLoadingAuthenticated(false);
            return Promise.resolve();
          });
      }
    }
  };

  /** Logouts the user
   * 
   */
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
    setUserError,
    refreshUserList,
    getCurrentUserData,
    isLoadingUserList,
    setIsLoadingUserList,
    isLoadingUserData,
    loginUser,
    logoutUser,
    isLoadingLogin,
    lastRefreshUserList,
    registerUser,
    isLoadingRegister,
    editUserDetail,
    isLoadingEditUserDetail,
    uploadImage,
  };
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

/** A hook for consuming our User context in a safe way
 * @example //getting the user list
 * import { useUserListData } from 'userContext'
 * const { userList } = useUserListData();
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
    (!lastRefreshUserList || lastRefreshUserList + 600 <= Date.now)
  ) {
    refreshUserList();
  }
  // What we want this consumer hook to actually return
  return { refreshUserList, userList, userError, isLoadingUserList };
};

/** A hook for consuming our User context in a safe way
 * @example //getting the user
 * import { useUserData } from 'userContext'
 * const { user } = useUserData();
 * @returns {User}
 */
export const useUserData = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useUserData must be used within a UserProvider');
  }

  const { user, userError, isLoadingUserData } = ctx;

  return { user, userError, isLoadingUserData };
};

/** A hook for consuming our User context in a safe way
 * @example //getting the current user
 * import { useCurrentUserData } from 'userContext'
 * const { currentUser } = useCurrentUserData();
 * @returns {User}
 */
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

/** A hook for consuming our User context in a safe way
 * @example //getting the edit user detail function
 * import { useEditUserDetailData } from 'userContext'
 * const { editUserDetail } = useEditUserDetailData();
 * @returns {Function}
 */
export const useEditUserDetailData = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useEditUserDetailData must be used within a UserProvider');
  }

  const { isLoadingEditUserDetail, editUserDetail } = ctx;

  return { isLoadingEditUserDetail, editUserDetail };
};

/** A hook for consuming our User context in a safe way
 * @example //getting the upload image function
 * import { useUploadImageData } from 'userContext'
 * const { uploadImage } = useUploadImageData();
 * @returns {Function}
 */
export const useUploadImageData = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useUploadImageData must be within a UserProvider');
  }

  const { userError, uploadImage } = ctx;

  return { userError, uploadImage };
};

/** A hook for consuming our User context in a safe way
 * @example //getting the isAuthenticated state
 * import { useUserAuthenticationData } from 'userContext'
 * const { isAuthenticated } = useUserAuthenticationData();
 * @returns {boolean}
 */
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

/** A hook for consuming our User context in a safe way
 * @example //getting the login user function
 * import { useUserLoginData } from 'userContext'
 * const { loginUser } = useUserLoginData();
 * @returns {Function}
 */
export const useUserLoginData = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useUserLoginData must be used within a UserProvider');
  }

  const { loginUser, userError, setUserError, isLoadingLogin } = ctx;

  return { loginUser, userError, setUserError, isLoadingLogin };
};

/** A hook for consuming our User context in a safe way
 * @example //getting the register user function
 * import { useUserRegisterData } from 'userContext'
 * const { registerUser } = useUserRegisterData();
 * @returns {Function}
 */
export const useUserRegisterData = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useUserRegisterData must be used within a UserProvider');
  }

  const { registerUser, userError, setUserError, isLoadingRegister } = ctx;

  return { registerUser, userError, setUserError, isLoadingRegister };
};

/** A hook for consuming our User context in a safe way
 * @example //getting the logout user function
 * import { useUserLogout } from 'userContext'
 * const { logoutUser } = useUserLogout();
 * @returns {Function}
 */
export const useUserLogout = () => {
  const ctx = useContext(userContext);

  if (ctx === undefined) {
    throw new Error('useUserLogout muse be used within a UserProvider');
  }

  const { logoutUser } = ctx;

  return { logoutUser };
};
