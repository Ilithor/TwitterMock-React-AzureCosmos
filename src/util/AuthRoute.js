import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Context
import { useUserAuthenticationData } from '../components/profile/userContext';

/** Displays attached components to user's who are authenticated
 * 
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.component
 * @param {boolean} props.authenticated
 * @param {object} props.rest 
 */
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
