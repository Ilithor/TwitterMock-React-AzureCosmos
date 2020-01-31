import React from 'react';
import _ from 'lodash';

// Components
import { NotificationCard } from './notificationCard';

// MUI
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Context
import { useNotificationData } from './notificationContext';
import { usePostData } from '../post/postContext';
import { useCommentListData } from '../comment/commentContext';

const useStyles = makeStyles({
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

/**
 * Displays an array of notifications for the user
 */
export const NotificationContent = () => {
  const classes = useStyles();
  const { notificationList, isLoadingNotifcationList } = useNotificationData();
  const { postList } = usePostData();
  const { commentList } = useCommentListData();
  if (isLoadingNotifcationList) {
    return (
      <div className={classes?.spinnerDiv}>
        <CircularProgress size={150} thickness={2} />
      </div>
    );
  }
  if (notificationList?.length > 0) {
    return _.map(notificationList, doc => {
      return (
        <NotificationCard
          key={`notification-${doc?.notificationId}`}
          notification={doc}
          post={postList[(doc?.postId)]}
          comment={commentList[(doc?.typeId)]}
        />
      );
    });
  }
  return (
    <React.Fragment>
      <h1>
        <span role='img' aria-label=''>
          😱😱😱
        </span>
        No more notifications!!!
      </h1>
      <p>Go make some friends, nerd!!!</p>
    </React.Fragment>
  );
};
