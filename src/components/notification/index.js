import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import { NotificationCard } from './notificationCard';

// Context
import { useNotificationData } from '../context/notificationContext';
import { usePostData } from '../context/postContext';
import { useCommentData } from '../context/commentContext';

/**
 * Displays an array of notifications for the user
 * @param {object} props
 * @param {object} props.classes
 */
export const NotificationPanel = ({ classes = {} }) => {
  const { notificationList, notificationError } = useNotificationData();
  const { postList, postError } = usePostData();
  const { commentList, commentError } = useCommentData();
  dayjs.extend(relativeTime);
  const Content = () => {
    if (notificationList?.length > 0) {
      return notificationList?.map(doc => {
        return (
          <NotificationCard
            key={`notification-${doc?._id}`}
            classes={classes}
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

  return (
    <div>
      <h1>
        Notifications!
        <span role='img' aria-label=''>
          💬
        </span>
      </h1>
      <hr />
      <Content />
    </div>
  );
};
