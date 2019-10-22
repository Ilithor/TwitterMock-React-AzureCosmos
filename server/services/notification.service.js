import Notification from '../models/notification.model';

/** Creates new notification
 * @param {Request} notificationParam 
 */
export const create = async notificationParam => {
  let dataForNotification = {};

  dataForNotification.read = false;
  dataForNotification.recipient = notificationParam.notification.recipient;
  dataForNotification.postId = notificationParam.params.postId;
  dataForNotification.sender = notificationParam.user.handle;
  dataForNotification.type = notificationParam.notification.type;
  dataForNotification.typeId = notificationParam.notification.typeId;

  const newNotification = new Notification(dataForNotification);

  await newNotification.save();
  return newNotification;
};
