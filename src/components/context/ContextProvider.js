import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// MUI
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

// Context
import { SettingProvider } from '../setting/settingContext';
import { CurrentUserProvider } from '../profile/currentUserContext';
import { AuthenticationProvider } from '../profile/authenticationContext';
import { NotificationProvider } from '../notification/notificationContext';
import { PostProvider } from '../post/postContext';
import { LikeProvider } from '../like/likeContext';
import { CommentProvider } from '../comment/commentContext';
import { LogoutProvider } from '../login/logoutContext';
import { UserListProvider } from '../profile/user/userListContext';
import { HelmetProvider } from '../../util/helmetContext';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: deepPurple,
  },
});

/** Main provider that manages other providers
 *
 * @type {IContextProviderComponentProps}
 * @returns {React.FunctionComponent}
 */
export const ContextProvider = ({ children }) => (
  <BrowserRouter>
    <SettingProvider>
      <ThemeProvider theme={theme}>
        <CurrentUserProvider>
          <AuthenticationProvider>
            <UserListProvider>
              <NotificationProvider>
                <PostProvider>
                  <LikeProvider>
                    <CommentProvider>
                      <LogoutProvider>
                        <HelmetProvider>{children}</HelmetProvider>
                      </LogoutProvider>
                    </CommentProvider>
                  </LikeProvider>
                </PostProvider>
              </NotificationProvider>
            </UserListProvider>
          </AuthenticationProvider>
        </CurrentUserProvider>
      </ThemeProvider>
    </SettingProvider>
  </BrowserRouter>
);

/**
 * @typedef IContextProviderComponentProps
 * @property {React.ReactChild} children
 */
