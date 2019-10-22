import Notification from '../models/notification.model';
import { create } from '../services/notification.service';

import mongoConnection from '../util/mongo';
import {
  findNotificationByRecipient,
  findNotificationAndUpdateRead
} from './find';
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
  if (req.notification.recipient === req.user.handle) {
    res
      .status(201)
      .json({ message: `${req.notification.type} successfully added` });
  } else {
    await create(req)
      .then(doc => {
        res.status(201).json({ message: `${doc.type} successfully added` });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  }
};

/** Marks notification as read by user
 * @type {RouteHandler}
 */
export const markNotificationRead = (req, res) => {
  req.body.forEach(async notificationId => {
    await findNotificationAndUpdateRead(notificationId);
  });
  return res.json({ message: 'Notifications marked read' });
};

/** Deletes notification upon successful deletion
 *  of a like or comment
 * @type {RouteHandler}
 */
export const deleteNotification = async (req, res) => {
  await Notification.findOneAndDelete({
    type: req.notification.type,
    typeId: req.notification.typeId
  });
  return res
    .status(200)
    .json({ message: `${req.notification.type} successfully removed` });
};

export const deleteAllNotifications = async (req, res) => {
  await Notification.findByIdAndDelete({
    postId: req.params.postId
  });
  return res.status(200).json({ message: 'Post successfully deleted' });
};
