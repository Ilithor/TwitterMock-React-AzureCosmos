import React, { createContext, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';

/** @type {React.Context<HelmetContextProps>} */
const helmetContext = createContext();

/**
 * @typedef HelmetContextProps
 * @property {string} currentPage
 * @property {React.Dispatch<React.SetStateAction<string>>} setCurrentPage
 */

/**This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @type {IHelmetProviderComponentProps}
 * @returns {React.FunctionComponent}
 */
export const HelmetProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('');

  const value = { setCurrentPage };

  return (
    <helmetContext.Provider value={value}>
      <div>
        <Helmet>
          <title>{currentPage}</title>
          <meta
            name='description'
            content='SocMon is a place to meet and communicate with friends and family. Create posts, then comment and like on what others have posted.'
          />
        </Helmet>
        {children}
      </div>
    </helmetContext.Provider>
  );
};

export const useHelmetData = () => {
  const ctx = useContext(helmetContext);

  if (ctx === undefined) {
    throw new Error('useHelmetData must be within a HelmetProvider');
  }

  const { setCurrentPage } = ctx;

  return { setCurrentPage };
};

/**
 * @typedef IHelmetProviderComponentProps
 * @property {React.ReactChild} children
 */
