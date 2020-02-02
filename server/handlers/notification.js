import _ from 'lodash';
import Notification from '../models/notification.model';
import { create, getNotificationList } from '../services/notification.service';

import mongoConnection from '../util/mongo';
import { findNotificationAndUpdateRead } from './find';
mongoConnection();

/** Retrieves all notifications
 * @type {RouteHandler}
 */
export const getNotification = (req, res) => {
  getNotificationList()
    .then(data => {
      if (!data) {
        return res.send(data);
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
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
};

/** Creates notification upon successful creation
 *  of a like or comment
 * @type {RouteHandler}
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
 * @type {RouteHandler}
 */
export const markNotificationRead = (req, res) => {
  findNotificationAndUpdateRead(req.body.notificationId)
    .then(() => {
      return res.status(200);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
};

/** Deletes notification upon successful deletion
 *  of a like or comment
 * @type {RouteHandler}
 */
export const deleteNotification = async req => {
  await Notification.findOneAndDelete({
    type: req.notification.type,
    typeId: req.notification.typeId,
  });
};

/** Deletes all notifications that matches given postId
 * @type {RouterHandler}
 */
export const deleteAllNotification = async postId => {
  await Notification.deleteMany({
    postId,
  });
};
