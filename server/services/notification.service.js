import Notification from '../models/notification.model';
import mongo from 'mongodb';

/** Find all notifications by recipient
 * @param {string} recipient
 * @return {Promise<UserNotification> | NotificationNotFound}
 */
export const getNotificationList = async () => {
  const error = {};
  const notificationList = Notification.find({})
    .sort({ createdAt: 1 })
    .read(mongo.ReadPreference.NEAREST)
    .limit(100);
  if (notificationList.length === 0) {
    error.notification = 'No notifications found';
    return error;
  } else {
    return notificationList;
  }
};

/** Creates new notification
 * @param {Request} notificationParam
 * @return {Promise<UserNotification>}
 */
export const create = async (recipient, postId, sender, type, typeId) => {
  const dataForNotification = {
    read: false,
    recipient,
    postId,
    sender,
    type,
    typeId,
  };

  const newNotification = new Notification(dataForNotification);

  await newNotification.save();
  return newNotification;
};
