import React from 'react';

// MUI
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Redux
import { Provider } from 'react-redux';
import store from '../../redux/store';

// Context
import { NotificationProvider } from './notificationContext';
import { getNotificationList } from '../../util/fetch/user';
import { PostProvider } from './postContext';
import { fetchPostList, fetchCommentList } from '../../util/fetch/post';
import { CommentProvider } from './commentContext';
import { deepPurple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: deepPurple,
  },
});

export const ContextProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider getNotificationList={getNotificationList}>
        <PostProvider fetchPostList={fetchPostList}>
          <CommentProvider fetchCommentList={fetchCommentList}>
            <Provider store={store}>{children}</Provider>
          </CommentProvider>
        </PostProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
