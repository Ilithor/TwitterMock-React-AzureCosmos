import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import { NotificationContent } from '../components/notification';

// Context
import { useHelmetData } from '../util/helmetContext';

/** Displays an array of notifications for the user
 *
 * @returns {React.FunctionComponent}
 */
export const NotificationPage = () => {
  dayjs.extend(relativeTime);
  const { setCurrentPage } = useHelmetData();
  useEffect(() => {
    setCurrentPage('Notifications');
  });
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
