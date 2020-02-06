import React, { useState, useEffect } from 'react';
import _ from 'lodash';

// Components
import { NotificationCard } from './notificationCard';

// MUI
import { CircularProgress } from '@material-ui/core';
import { useStyles } from './notification.style';

// Context
import { useNotificationData } from './notificationContext';
import { usePostData } from '../post/postContext';
import { useCommentListData } from '../comment/commentContext';
import { useCurrentUserData } from '../profile/userContext';

/** Displays an array of notifications for the user
 *
 * @type {React.FunctionComponent}
 */
export const NotificationContent = () => {
  const classes = useStyles();
  const { notificationList, isLoadingNotifcationList } = useNotificationData();
  const { postList } = usePostData();
  const { commentList } = useCommentListData();
  const { currentUser, isLoadingUserData } = useCurrentUserData();
  const [userNotificationList, setUserNotificationList] = useState();
  useEffect(() => {
    if (!isLoadingNotifcationList && !isLoadingUserData) {
      const notificationData = _.values(notificationList).filter(
        notification => notification?.recipient === currentUser?.userHandle
      );
      if (notificationData) {
        setUserNotificationList(notificationData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingNotifcationList, isLoadingUserData]);
  if (userNotificationList?.length > 0 && postList && commentList) {
    return _.map(userNotificationList, doc => (
      <NotificationCard
        key={`notification-${doc?.notificationId}`}
        notification={doc}
        post={postList?.[doc?.postId]}
        comment={commentList?.[doc?.typeId]}
      />
    ));
  }
  if (userNotificationList?.length === 0) {
    return (
      <React.Fragment>
        <h1>No new notifications</h1>
      </React.Fragment>
    );
  }
  return (
    <div className={classes?.spinnerDiv}>
      <CircularProgress size={150} thickness={2} />
    </div>
  );
};
