import { Schema,  Document, Model } from "mongoose";
import userDB from '../../connection.js';

export const TEMPLATE_TYPES = ["application", "game"];
export const TEMPLATE_TYPES_OPTIONS = {
    application: "application",
    game: "game",
}; 
// Define an interface representing a document in MongoDB.
export interface ITemplate{
    name: string;
    type: 'application' | 'game';

}

// Define an interface for the document methods.
export interface ITemplateDocument extends ITemplate, Document {
    removed_at: Date|null;
}

// Define the schema corresponding to the document interface.
const templateSchema = new Schema<ITemplateDocument>({
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: TEMPLATE_TYPES, required: true },
    removed_at: { type: Date, default: null }
},{ timestamps: true });

// Create an index on the name field.
templateSchema.index({ name: 1 });

// Create a Model.
export const Templates: Model<ITemplateDocument> = userDB.model<ITemplateDocument>('Template', templateSchema);

