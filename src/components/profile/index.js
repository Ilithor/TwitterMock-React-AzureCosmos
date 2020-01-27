import React from 'react';

// Components
import { UserProfileDisplay } from './user';
import { DefaultProfileDisplay } from './default/DefaultProfileDisplay';

// Context
import { useUserAuthenticationData } from '../context/userContext';

/** View component for displaying either the default or user profile
 * @type {React.FunctionComponent}
 */
export const Profile = () => {
  const {
    isAuthenticated,
    isLoadingAuthenticated,
  } = useUserAuthenticationData();
  
  if (!isLoadingAuthenticated) {
    if (!!isAuthenticated) {
      return <UserProfileDisplay />;
    } else {
      return <DefaultProfileDisplay />;
    }
  } else {
    return <p>Loading...</p>;
  }
};
