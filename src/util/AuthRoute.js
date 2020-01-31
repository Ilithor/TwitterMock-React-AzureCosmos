import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Context
import { useUserAuthenticationData } from '../components/profile/userContext';

export const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  const { isAuthenticated } = useUserAuthenticationData();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};
