import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import * as fetchUtil from '../../util/fetch';
import { useAuthenticationData } from '../profile/authenticationContext';

/** @type {React.Context<{userList:User[],userError:Error,getData:()=>void}} */
const registerContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @returns {React.FunctionComponent}
 */
export const RegisterProvider = ({ children }) => {
  const [registerError, setRegisterError] = useState({});
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const { getAuthenticated } = useAuthenticationData();

  const registerUser = async userParam => {
    if (!isLoadingRegister) {
      setIsLoadingRegister(true);
      const error = await checkIfUndefined(userParam);
      if (error) {
        setIsLoadingRegister(false);
        return Promise.reject(error);
      }
      const saltedPassword = await saltPassword(userParam?.password);
      userParam.password = saltedPassword;
      await fetchUtil.user
        .registerUser(userParam)
        .then(async res => {
          if (!res?.data?.token) {
            return Promise.reject(res?.data);
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
          return;
        });
    }
  };

  /** Salts provided password
   *
   * @param {string} password
   * @returns {string}
   */
  const saltPassword = async password => {
    const salt = await bcrypt.genSalt().catch(err => {
      console.error(err);
      Promise.reject(err);
    });
    const hash = await bcrypt.hash(password, salt).catch(err => {
      console.error(err);
      Promise.reject(err);
    });
    return hash;
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
   */
  const setUserHandleHeader = userHandle => {
    if (userHandle !== 'undefined') {
      localStorage.setItem('Handle', userHandle);
    }
  };

  /** Checks if params are undefined
   *
   * @param {{email:string,userHandle:string,password:string,confirmPassword:string}} userParam
   * @returns {Error}
   */
  const checkIfUndefined = userParam => {
    let err;
    if (!userParam.email) {
      err = {
        ...err,
        email: 'Must not be empty',
      };
    }
    if (!userParam.userHandle) {
      err = {
        ...err,
        userHandle: 'Must not be empty',
      };
    }
    if (!userParam.password) {
      err = {
        ...err,
        password: 'Must not be empty',
      };
    }
    if (!userParam.confirmPassword) {
      err = {
        ...err,
        confirmPassword: 'Must not be empty',
      };
    }
    return err;
  };

  /** Saves any errors in validation in registerError state
   *
   * @param {UserRegisterParam} registerParam
   * @returns {UserRegisterParam}
   */
  const validationCheckRegister = registerParam => {
    let err;
    if (isEmpty(registerParam?.email)) {
      err = { email: 'Must not be empty' };
    } else if (!isEmail(registerParam?.email)) {
      err = { email: 'Must be a valid email address' };
    }
    if (isEmpty(registerParam?.userHandle)) {
      err = { ...err, userHandle: 'Must not be empty' };
    }
    if (isEmpty(registerParam?.password)) {
      err = { ...err, password: 'Must not be empty' };
    }
    if (isEmpty(registerParam?.confirmPassword)) {
      err = { ...err, confirmPassword: 'Must not be empty' };
    }
    if (registerParam?.password !== registerParam?.confirmPassword) {
      err = { ...err, confirmPassword: 'Password confirmation must match' };
    }
    setRegisterError(err);
    return registerParam;
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
    validationCheckRegister,
    registerError,
    registerUser,
    isLoadingRegister,
    setRegisterError,
  };
  return (
    <registerContext.Provider value={value}>
      {children}
    </registerContext.Provider>
  );
};

/**
 * @typedef UseUserRegisterDataResult
 * @property {()=>void} registerUser
 * @property {Error} registerError
 * @property {boolean} isLoadingRegister
 */

/** A hook for consuming our User context in a safe way
 *
 * @example //getting the register user function
 * import { useUserRegisterData } from 'registerContext'
 * const { registerUser } = useUserRegisterData();
 * @returns {UseUserRegisterDataResult}
 */
export const useUserRegisterData = () => {
  const ctx = useContext(registerContext);

  if (ctx === undefined) {
    throw new Error(
      'useUserRegisterData must be used within a RegisterProvider'
    );
  }

  const {
    registerUser,
    registerError,
    setRegisterError,
    isLoadingRegister,
  } = ctx;

  return { registerUser, registerError, setRegisterError, isLoadingRegister };
};

/** A hook for consuming our Register context in a safe way
 *
 * @example //getting the register validation function
 * import { useRegisterValidationData } from 'registerContext'
 * const { validationCheckRegister } = useRegisterValidationData();
 * @returns {Function}
 */
export const useRegisterValidationData = () => {
  const ctx = useContext(registerContext);

  if (ctx === undefined) {
    throw new Error(
      'useRegisterValidationData must be used within a RegisterProvider'
    );
  }

  const { validationCheckRegister } = ctx;

  return { validationCheckRegister };
};

/**
 * @typedef UserRegisterParam
 * @property {string} userHandle
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 */
