import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import forge from 'node-forge';
import * as fetchUtil from '../../util/fetch';
import { useAuthenticationData } from '../profile/authenticationContext';

/** @type {React.Context<RegisterContextProps>} */
const registerContext = createContext();

/**
 * @typedef RegisterContextProps
 * @property {Error} registerError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setRegisterError
 * @property {boolean} isLoadingRegister
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingRegister
 * @property {(userParam:UserRegisterParam)=>void} registerUser
 * @property {(password:string)=>string} hashPassword
 * @property {(token:string)=>void} setAuthorizationHeader
 * @property {(userHandle:string)=>void} setUserHandleHeader
 * @property {(userParam:UserRegisterParam)=>Error} checkIfUndefined
 * @property {(registerParam:UserRegisterParam)=>UserRegisterParam} validationCheckRegister
 * @property {(string:string)=>boolean} isEmpty
 * @property {(email:string)=>boolean} isEmail
 *
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @type {IRegisterProviderComponentProps}
 * @returns {React.FunctionComponent}
 */
export const RegisterProvider = ({ children }) => {
  const [registerError, setRegisterError] = useState({});
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const { getAuthenticated } = useAuthenticationData();

  /** Attempts to register a new user
   *
   * @param {UserRegisterParam} userParam
   * @returns {Promise}
   */
  const registerUser = async userParam => {
    if (!isLoadingRegister) {
      // setIsLoadingRegister(true);
      const error = await checkIfUndefined(userParam);
      if (error) {
        setIsLoadingRegister(false);
        return Promise.reject(error);
      }
      const hashedPassword = await hashPassword(userParam?.password);
      userParam.password = hashedPassword;
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

  /** Hashes provided password
   *
   * @param {string} password
   * @returns {string}
   */
  const hashPassword = async password => {
    const encryptedPassword = await encryptPassword(password);
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(encryptedPassword, salt).catch(err => {
      console.error(err);
      Promise.reject(err);
    });
    return hash;
  };

  /** Converts password to sha256
   *
   * @param {string} password
   * @returns {string}
   */
  const encryptPassword = async password => {
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

  /** Checks if params are undefined
   *
   * @param {UserRegisterParam} userParam
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
 * @property {(userParam:UserRegisterParam)=>void} registerUser
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

/**
 * @typedef UseRegisterValidationDataResult
 * @property {(registerParam:UserRegisterParam)=>UserRegisterParam} validationCheckRegister
 */

/** A hook for consuming our Register context in a safe way
 *
 * @example //getting the register validation function
 * import { useRegisterValidationData } from 'registerContext'
 * const { validationCheckRegister } = useRegisterValidationData();
 * @returns {UseRegisterValidationDataResult}
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
 * @typedef IRegisterProviderComponentProps
 * @property {React.ReactChild} children
 */

/**
 * @typedef UserRegisterParam
 * @property {string} userHandle
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 */
