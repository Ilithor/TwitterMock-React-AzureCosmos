import React from 'react';

// MUI
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

// Redux
import { Provider } from 'react-redux';
import store from '../../redux/store';

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
import { UserProvider } from './userContext';
import { LikeProvider } from '../like/likeContext';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: deepPurple,
  },
});

export const ContextProvider = ({ children }) => {
  return (
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
                <Provider store={store}>{children}</Provider>
              </CommentProvider>
            </LikeProvider>
          </PostProvider>
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
};
