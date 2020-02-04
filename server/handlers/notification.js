import _ from 'lodash';
import { Notification } from '../models/notification.model';
import { create, getNotificationList } from '../services/notification.service';

import mongoConnection from '../util/mongo';
import { findNotificationAndUpdateRead } from './find';
mongoConnection();

/** Retrieves all notifications
 * @type {RouteHandler}
 */
export const getNotification = async (req, res) => {
  const data = await getNotificationList().catch(err => {
    console.error(err);
    return res.status(404);
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
 * @type {RouteHandler}
 * @returns {Promise<void | Error>}
 */
export const createNotification = async (
  recipient,
  postId,
  sender,
  type,
  typeId
) => {
  if (sender === recipient) {
    return Promise.resolve();
  }
  await create(recipient, postId, sender, type, typeId);
};

/** Marks notification as read by user
 * @type {RouteHandler}
 */
export const markNotificationRead = async (req, res) => {
  await findNotificationAndUpdateRead(req.body.notificationId).catch(err => {
    console.error(err);
    return res.status(404);
  });
  return res.status(200);
};

/** Deletes notification upon successful deletion
 *  of a like or comment
 * @type {RouteHandler}
 */
export const deleteNotification = async (userHandle, type, typeId) => {
  await Notification.findOneAndDelete({
    userHandle,
    type,
    typeId,
  }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};

/** Deletes all notifications that matches given postId
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
