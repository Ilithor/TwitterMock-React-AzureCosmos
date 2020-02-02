import React, { createContext, useContext, useState } from 'react';

/** @type {React.Context<{userList:User[],userError:Error,getData:()=>void}} */
const loginContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 * @param {object} props
 * @param {React.ReactChild} props.children
 */
export const LoginProvider = ({ children }) => {
  const [loginError, setLoginError] = useState();

  /**
   * Saves any errors in validation in loginError state
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
   * @param {String} string
   * @returns {Boolean}
   */
  const isEmpty = string => {
    if (string.trim() === '') {
      return true;
    } else {
      return false;
    }
  };

  /** Checks if provided email is valid
   * @param {String} email
   * @returns {Boolean}
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
  };
  return (
    <loginContext.Provider value={value}>{children}</loginContext.Provider>
  );
};

/**
 * A hook for consuming our Login context in a safe way
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
 * @typedef UserLoginParam
 * @property {String} email
 * @property {String} password
 */
