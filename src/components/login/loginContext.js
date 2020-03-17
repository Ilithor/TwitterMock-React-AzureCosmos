import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import forge from 'node-forge';
import * as fetchUtil from '../../util/fetch';
import { useAuthenticationData } from '../profile/authenticationContext';

/** @type {React.Context<LoginContextProps>} */
const loginContext = createContext();

/**
 * @typedef LoginContextProps
 * @property {Error} loginError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setLoginError
 * @property {boolean} isLoadingLogin
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingLogin
 * @property {(userParam:UserLoginParam)=>void} loginUser
 * @property {(password:string)=>string} hashPassword
 * @property {(token:string)=>void} setAuthorizationHeader
 * @property {(userHandle:string)=>void} setUserHandleHeader
 * @property {(userParam:UserLoginParam)=>Error} checkIfUndefined
 * @property {(userParam:UserLoginParam)=>UserLoginParam} validationCheckLogin
 * @property {(string:string)=>boolean} isEmpty
 * @property {(email:string)=>boolean} isEmail
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @type {ILoginProviderComponentProps}
 * @returns {React.FunctionComponent}
 */
export const LoginProvider = ({ children }) => {
  const [loginError, setLoginError] = useState();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const { getAuthenticated } = useAuthenticationData();

  /** Attempts to login the user
   *
   * @param {UserLoginParam} userParam
   * @returns {Promise}
   */
  const loginUser = async userParam => {
    if (!isLoadingLogin) {
      setIsLoadingLogin(true);
      const error = await checkIfUndefined(userParam);
      if (Object.keys(error).length > 0) {
        setIsLoadingLogin(false);
        return Promise.reject(error);
      }
      const hashedPassword = await hashPassword(userParam?.password).catch(
        err => {
          console.error(err);
          return Promise.reject(err);
        }
      );
      userParam.password = hashedPassword;
      await fetchUtil.user
        .loginUser(userParam)
        .then(async res => {
          if (res?.data?.email) {
            return Promise.reject(res?.data);
          }
          if (!res?.data?.token || !res?.data?.userHandle) {
            return Promise.reject(res?.data);
          }
          setAuthorizationHeader(res?.data?.token);
          setUserHandleHeader(res?.data?.userHandle);
          await getAuthenticated();
        })
        .catch(err => {
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingLogin(false);
          return;
        });
    }
  };

  /** Hashes provided password
   *
   * @param {string} password
   * @returns {string}
   */
  const hashPassword = password => {
    const md = forge.md.sha256.create();
    md.update(password);
    return md.digest().toHex();
  };

  /** Sets the user token and authorization
   *
   * @param {string} token
   * @returns {void}
   */
  const setAuthorizationHeader = token => {
    if (token?.length > 30) {
      const Token = `Bearer ${token}`;
      localStorage.setItem('Token', Token);
      axios.defaults.headers.common['Authorization'] = Token;
    }
  };

  /** Sets the user's handle in the local storage
   *
   * @param {string} userHandle
   * @returns {void}
   */
  const setUserHandleHeader = userHandle => {
    if (userHandle !== 'undefined') {
      localStorage.setItem('Handle', userHandle);
    }
  };

  /** Checks if the params are undefined
   *
   * @param {UserLoginParam} userParam
   * @returns {Error}
   */
  const checkIfUndefined = userParam => {
    let err = {};
    if (!userParam.email) {
      err = {
        ...err,
        email: 'Must not be empty',
      };
    }
    if (!userParam.password) {
      err = {
        ...err,
        password: 'Must not be empty',
      };
    }
    return err;
  };

  /** Saves any errors in validation in loginError state
   *
   * @param {UserLoginParam} loginParam
   * @returns {UserLoginParam}
   */
  const validationCheckLogin = loginParam => {
    const err = {};
    if (isEmpty(loginParam?.email)) {
      err.email = 'Must not be empty';
    } else if (!isEmail(loginParam?.email)) {
      err.email = 'Must be a valid email address';
    }
    if (isEmpty(loginParam?.password)) {
      err.password = 'Must not be empty';
    }
    if (Object.keys(err) !== 0) {
      setLoginError(err);
      return loginParam;
    }
    return loginParam;
  };

  /** Checks if provided string is empty
   *
   * @param {string} string
   * @returns {boolean}
   */
  const isEmpty = string => {
    if (string.trim() === '') {
      return true;
    } else {
      return false;
    }
  };

  /** Checks if provided email is valid
   *
   * @param {string} email
   * @returns {boolean}
   */
  const isEmail = email => {
    // eslint-disable-next-line no-useless-escape
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) {
      return true;
    } else {
      return false;
    }
  };

  const value = {
    validationCheckLogin,
    loginError,
    setLoginError,
    isLoadingLogin,
    loginUser,
  };
  return (
    <loginContext.Provider value={value}>{children}</loginContext.Provider>
  );
};

/**
 * @typedef UseLoginValidationDataResult
 * @property {(userParam:UserLoginParam)=>UserLoginParam} validationCheckLogin
 * @property {Error} loginError
 */

/** A hook for consuming our Login context in a safe way
 *
 * @example //getting the login validation function
 * import { useLoginValidationData } from 'loginContext'
 * const { validationCheckLogin } = useLoginValidationData();
 * @returns {UseLoginValidationDataResult}
 */
export const useLoginValidationData = () => {
  const ctx = useContext(loginContext);

  if (ctx === undefined) {
    throw new Error(
      'useLoginValidationData must be used within a LoginProvider'
    );
  }

  const { validationCheckLogin, loginError } = ctx;

  return { validationCheckLogin, loginError };
};

/**
 * @typedef UseLoginDataResult
 * @property {boolean} isLoadingLogin
 * @property {(userParam:UserLoginParam)=>void} loginUser
 * @property {Error} loginError
 */

/** A hook for consuming our Login context in a safe way
 *
 * @example //getting the login function
 * import { useLoginData } from 'loginContext'
 * const { loginUser } = useLoginData();
 * @returns {UseLoginDataResult}
 */
export const useLoginData = () => {
  const ctx = useContext(loginContext);

  if (ctx === undefined) {
    throw new Error('useLoginData must be used within a LoginProvider');
  }

  const { isLoadingLogin, loginUser, loginError, setLoginError } = ctx;

  return { isLoadingLogin, loginUser, loginError, setLoginError };
};

/**
 * @typedef ILoginProviderComponentProps
 * @property {React.ReactChild} children
 */

/**
 * @typedef UserLoginParam
 * @property {string} email
 * @property {string} password
 */
