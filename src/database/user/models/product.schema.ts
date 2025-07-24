import  { Document, Schema } from "mongoose";
import userDB from "../connection.js";

export enum ProductCategory {
  builder = "builder",
  builderIos = "builderIos",
  builderAndroid = "builderAndroid",
  asoGenerator = "asoGenerator",
  iconGenerator = "iconGenerator",
}

export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  currency: string;
  quantity: number;
  category: ProductCategory;
  removed_at: string|Date;
}

export interface IProductDocument extends IProduct, Document {}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    currency: { type: String, required: true, default: "USD" },
    quantity: { type: Number, required: true },
    category: { type: String, required: true,enum: ProductCategory },
    removed_at : {type:Date,required:false}
  },
  { timestamps: true }
);

export const Products = userDB.model<IProductDocument>(
  "Product",
  ProductSchema
);
