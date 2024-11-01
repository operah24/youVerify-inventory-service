import mongoose from "mongoose";
import { Schema } from "./Schema";
export interface IItem {
  _id?: string;
  itemName: string,
  stockQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
}


const ItemSchema = new mongoose.Schema<IItem>({
  itemName: { type: String, required: true },
  stockQuantity: { type: Number, default: 0 },
},{
  timestamps: true
});

export const Item = mongoose.model<IItem>(Schema.Item, ItemSchema);