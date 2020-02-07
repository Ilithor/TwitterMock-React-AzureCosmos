import React from 'react';

// MUI
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

// Context
import { NotificationProvider } from '../notification/notificationContext';
import {
  fetchUserList,
  loginUser,
  fetchUserData,
  fetchLikeList,
  fetchNotificationList,
} from '../../util/fetch/user';
import { PostProvider } from '../post/postContext';
import { fetchPostList, fetchCommentList } from '../../util/fetch/post';
import { CommentProvider } from '../comment/commentContext';
import { UserProvider } from '../profile/userContext';
import { LikeProvider } from '../like/likeContext';
import { SettingProvider } from '../setting/settingContext';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: deepPurple,
  },
});

/** Main provider that manages other providers
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {React.ReactChild} props.children
 */
export const ContextProvider = ({ children }) => (
  <SettingProvider>
    <ThemeProvider theme={theme}>
      <UserProvider
        fetchUserList={fetchUserList}
        fetchUserData={fetchUserData}
        loginUser={loginUser}
      >
        <NotificationProvider fetchNotificationList={fetchNotificationList}>
          <PostProvider fetchPostList={fetchPostList}>
            <LikeProvider fetchLikeList={fetchLikeList}>
              <CommentProvider fetchCommentList={fetchCommentList}>
                {children}
              </CommentProvider>
            </LikeProvider>
          </PostProvider>
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  </SettingProvider>
);
