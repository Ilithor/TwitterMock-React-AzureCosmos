import _ from 'lodash';
import mongoConnection from '../util/mongo';
import { Notification } from '../models/notification.model';
import { create, getNotificationList } from '../services/notification.service';
import {
  findNotificationAndUpdateRead,
  findAndDeleteNotification,
} from './find';

mongoConnection();

/** Retrieves all notifications
 *
 * @type {import('express').Handler}
 * @returns {Promise<Notification[]>}
 */
export const getNotification = async (req, res) => {
  const data = await getNotificationList().catch(err => {
    console.error(err);
    return res.send(err);
  });
  if (!data) {
    return res.status(404);
  }
  const notificationList = _.map(data, doc => ({
    notificationId: doc._id,
    createdAt: doc.createdAt,
    postId: doc.postId,
    sender: doc.sender,
    recipient: doc.recipient,
    type: doc.type,
    typeId: doc.typeId,
    read: doc.read,
  }));
  return res.status(200).send(notificationList);
};

/** Creates notification upon successful creation
 *  of a like or comment
 *
 * @type {import('express').Handler}
 * @returns {Promise}
 */
export const createNotification = async (
  recipient,
  postId,
  sender,
  type,
  typeId
) => {
  if (sender === recipient) {
    return;
  }
  await create(recipient, postId, sender, type, typeId);
};

/** Marks notification as read by user
 *
 * @type {import('express').Handler}
 */
export const markNotificationRead = async (req, res) => {
  await findNotificationAndUpdateRead(req.body.notificationId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  return res.status(200).send(true);
};

/** Deletes a notification
 *
 * @type {import('express').Handler}
 */
export const deleteNotification = async (req, res) => {
  const notification = await findAndDeleteNotification(
    req.params.notificationId
  ).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
  console.log(notification);
  if (notification.deletedCount === 1) {
    return res.status(200).send(true);
  }
};

/** Deletes all notifications that matches given postId
 *
 * @type {RouterHandler}
 */
export const deleteAllNotification = async postId => {
  await Notification.deleteMany({
    postId,
  }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};
