import Notification from '../models/notification.model';

import mongoConnection from '../util/mongo';
import { findNotificationByRecipient, findNotificationAndUpdateRead } from './find';
mongoConnection();

/** Retrieves all notifications
 * @type {RouteHandler}
 */
export const getNotification = async (req, res) => {
  const userAttemptAccess = String(req.user.handle);
  if (userAttemptAccess !== req.params.handle) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  await findNotificationByRecipient(req.user.handle)
    .then(data => {
      if (data.notification) {
        return res.status(404).json({ error: data.notification });
      }

      let notification = [];
      data.forEach(doc => {
        notification.push({
          createdAt: doc.createdAt,
          postId: doc.typeId,
          sender: doc.sender,
          type: doc.type
        });
      });
      if (notification.length === 0) {
        return res.json({ message: 'No notifications found' });
      } else {
        return res.json(notification);
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

/** Creates notification upon successful creation
 *  of a like or comment
 * @type {RouteHandler}
 */
export const createNotification = async (req, res) => {
  let notificationToCreate = {};

  notificationToCreate.read = false;
  notificationToCreate.recipient = req.notification.recipient;
  notificationToCreate.postId = req.params.postId;
  notificationToCreate.sender = req.user.handle;
  notificationToCreate.type = req.notification.type;
  notificationToCreate.typeId = req.notification.typeId;

  const newNotification = new Notification(notificationToCreate);
  newNotification.createdAt = new Date().toISOString();

  await newNotification.save();
  if (newNotification.type === 'like') {
    let like = req.notification.typeItem;
    return res.status(201).json({ like });
  } else {
    let comment = req.notification.typeItem;
    return res.status(201).json({ comment });
  }
};

/** Marks notification as read by user
 * @type {RouteHandler}
 */
export const markNotificationRead = (req, res) => {
  req.body.forEach(async notificationId => {
    await findNotificationAndUpdateRead(notificationId);
  })
    return res.json({ message: 'Notifications marked read' });
}

/** Deletes notification upon successful deletion
 *  of a like or comment
 * @type {RouteHandler}
 */
export const deleteNotification = async (req, res) => {
  await Notification.findOneAndDelete({
    type: req.notification.type,
    typeId: req.notification.typeId
  });
  if (req.notification.type === 'like') {
    return res.status(200).json({ message: 'Like successfully removed' });
  } else {
    return res.status(200).json({ message: 'Comment successfully removed' });
  }
};
