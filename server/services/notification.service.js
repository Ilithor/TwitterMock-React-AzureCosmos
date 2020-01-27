import Notification from '../models/notification.model';

/** Creates new notification
 * @param {Request} notificationParam
 * @return {Promise<UserNotification>}
 */
export const create = async (recipient, postId, sender, type, typeId) => {
  let dataForNotification = {};

  dataForNotification.read = false;
  dataForNotification.recipient = recipient;
  dataForNotification.postId = postId;
  dataForNotification.sender = sender;
  dataForNotification.type = type;
  dataForNotification.typeId = typeId;

  const newNotification = new Notification(dataForNotification);

  await newNotification.save();
  return newNotification;
};
