import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import { NotificationContent } from '../components/notification';

/**
 * Displays an array of notifications for the user
 */
export const NotificationPage = () => {
  dayjs.extend(relativeTime);
  return (
    <div>
      <h1>
        Notifications!
        <span role='img' aria-label=''>
          💬
        </span>
      </h1>
      <hr />
      <NotificationContent />
    </div>
  );
};
