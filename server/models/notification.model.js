import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  expires: { type: Date, index: { expireAfterSeconds: 60 } },
  read: { type: Boolean, required: true },
  recipient: { type: String, required: true },
  postId: { type: String, required: true },
  sender: { type: String, required: true },
  type: { type: String, required: true },
  typeId: { type: String, required: true },
});

export const Notification = mongoose.model('Notification', NotificationSchema);
