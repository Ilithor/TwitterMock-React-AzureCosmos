import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCurrentUserData } from './currentUserContext';

const authenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const history = useHistory();
  const { fetchCurrentUser } = useCurrentUserData();
  const [authenticationError, setAuthenticationError] = useState();
  const [isLoadingAuthentication, setIsLoadingAuthentication] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAuthenticated = async () => {
    if (
      localStorage?.Token &&
      localStorage?.Handle &&
      !isLoadingAuthentication &&
      !isAuthenticated
    ) {
      setIsLoadingAuthentication(true);
      const decodedToken = jwtDecode(localStorage?.Token);
      if (decodedToken?.exp * 1000 < Date.now()) {
        localStorage.removeItem('Token');
        localStorage.removeItem('Handle');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        history.push('/login');
      } else {
        axios.defaults.headers.common['Authorization'] = localStorage?.Token;
        await fetchCurrentUser()
          .then(() => {
            setIsAuthenticated(true);
          })
          .catch(err => {
            setAuthenticationError(err);
            return Promise.reject(err);
          })
          .finally(() => {
            setIsLoadingAuthentication(false);
            return;
          });
      }
    }
  };

  const value = {
    authenticationError,
    isLoadingAuthentication,
    isAuthenticated,
    setIsAuthenticated,
    getAuthenticated,
  };

  return (
    <authenticationContext.Provider value={value}>
      {children}
    </authenticationContext.Provider>
  );
};

/**
 * @typedef UseAuthenticationDataResult
 * @property {boolean} isAuthenticated
 * @property {Error} authenticationError
 * @property {()=>void} getAuthenticated
 * @property {boolean} isLoadingAuthentication
 */

/** A hook for consuming our authentication context in a safe way
 *
 * @example //getting the isAuthenticated state
 * import { useAuthenticationData } from 'authenticationContext'
 * const { isAuthenticated } = useAuthenticationData();
 * @returns {UseAuthenticationDataResult}
 */
export const useAuthenticationData = () => {
  const ctx = useContext(authenticationContext);

  if (ctx === undefined) {
    throw new Error(
      'useAuthenticationData must be within a AuthenticationProvider'
    );
  }

  const {
    isAuthenticated,
    setIsAuthenticated,
    authenticationError,
    getAuthenticated,
    isLoadingAuthentication,
  } = ctx;

  return {
    isAuthenticated,
    setIsAuthenticated,
    authenticationError,
    getAuthenticated,
    isLoadingAuthentication,
  };
};
