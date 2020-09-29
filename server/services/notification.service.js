import { Notification } from '../models/notification.model';
import mongo from 'mongodb';

/** Find all notifications
 *
 * @returns {Promise<NotificationData>}
 */
export const getNotificationList = async () => {
  return await Notification.find({})
    .sort({ createdAt: 1 })
    .read(mongo.ReadPreference.NEAREST)
    .limit(100)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

/** Creates new notification
 *
 * @param {string} recipient
 * @param {string} postId
 * @param {string} sender
 * @param {string} type
 * @param {string} typeId
 * @returns {Promise}
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
};
