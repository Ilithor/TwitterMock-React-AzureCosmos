import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useAuthenticationData } from '../profile/authenticationContext';

const logoutContext = createContext();

export const LogoutProvider = ({ children }) => {
  const { setIsAuthenticated } = useAuthenticationData();

  /** Logouts the user
   *
   */
  const logoutUser = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Handle');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  const value = { logoutUser };

  return (
    <logoutContext.Provider value={value}>{children}</logoutContext.Provider>
  );
};

/**
 * @typedef UseLogoutDataResult
 * @property {()=>void} logoutUser
 */

/** A hook for consuming our User context in a safe way
 *
 * @example //getting the logout user function
 * import { useLogoutData } from 'logoutContext'
 * const { logoutUser } = useLogoutData();
 * @returns {UseLogoutDataResult}
 */
export const useLogoutData = () => {
  const ctx = useContext(logoutContext);

  if (ctx === undefined) {
    throw new Error('useLogoutData must be within a LogoutProvider');
  }

  const { logoutUser } = ctx;

  return { logoutUser };
};
