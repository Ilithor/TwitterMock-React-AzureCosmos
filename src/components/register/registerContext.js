import React, { createContext, useContext, useState } from 'react';

/** @type {React.Context<{userList:User[],userError:Error,getData:()=>void}} */
const registerContext = createContext();

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 * @param {object} props
 * @param {React.ReactChild} props.children
 */
export const RegisterProvider = ({ children }) => {
  const [registerError, setRegisterError] = useState('');

  /**
   * Saves any errors in validation in registerError state
   * @param {UserRegisterParam} registerParam
   * @returns {UserRegisterParam}
   */
  const validationCheckRegister = registerParam => {
    const err = {};
    if (isEmpty(registerParam?.email)) {
      err.email = 'Must not be empty';
    } else if (!isEmail(registerParam?.email)) {
      err.email = 'Must be a valid email address';
    }
    if (isEmpty(registerParam?.userHandle)) {
      err.userHandle = 'Must not be empty';
    }
    if (isEmpty(registerParam?.password)) {
      err.password = 'Must not be empty';
    }
    if (isEmpty(registerParam?.confirmPassword)) {
      err.confirmPassword = 'Must not be empty';
    }
    if (registerParam?.password !== registerParam?.confirmPassword) {
      err.confirmPassword = 'Password confirmation must match';
    }
    if (Object.keys(err) !== 0) {
      setRegisterError(err);
      return registerParam;
    }
    return registerParam;
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
    validationCheckRegister,
    registerError,
  };
  return (
    <registerContext.Provider value={value}>
      {children}
    </registerContext.Provider>
  );
};

/**
 * A hook for consuming our Register context in a safe way
 */
export const useRegisterValidationData = () => {
  const ctx = useContext(registerContext);

  if (ctx === undefined) {
    throw new Error(
      'useRegisterValidationData must be used within a RegisterProvider'
    );
  }

  const { validationCheckRegister, registerError } = ctx;

  return { validationCheckRegister, registerError };
};

/**
 * @typedef UserRegisterParam
 * @property {String} userHandle
 * @property {String} email
 * @property {String} password
 * @property {string} confirmPassword
 */
