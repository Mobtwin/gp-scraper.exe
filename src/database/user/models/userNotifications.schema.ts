import  { Schema, Document, Types } from "mongoose";
import userDB from "../connection.js";

export interface IUserNotification extends Document {
  userId: Types.ObjectId;
  type: string;
  appId: string;
  appName: string;
  developerId?: string;
  developerName?: string;
  metadata?: Record<string, any>;
  relatedTo?: string;
  delivered: boolean;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserNotificationSchema = new Schema<IUserNotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    appId: { type: String, required: true },
    appName: { type: String, required: true },
    developerId: { type: String },
    developerName: { type: String },
    metadata: { type: Schema.Types.Mixed },
    relatedTo: { type: String }, // optional additional reference
    delivered: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export const UserNotification = userDB.model<IUserNotification>(
  "UserNotification",
  UserNotificationSchema
);
