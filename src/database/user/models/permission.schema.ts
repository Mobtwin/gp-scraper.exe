import { Document, Model,  Schema } from "mongoose";
import userDB from '../connection.js';
export interface IPermission {
  name: string; // e.g., 'CREATE_USER'
  description?: string; // e.g., 'Create a new user'
}

export interface IPermissionDocument extends IPermission, Document {};

const PermissionSchema = new Schema<IPermissionDocument>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
}, { timestamps: true });

export const Permissions:Model<IPermissionDocument> = userDB.model<IPermissionDocument>('Permission', PermissionSchema);