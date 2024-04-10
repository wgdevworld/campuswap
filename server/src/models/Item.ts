import { Schema, model } from "mongoose";
import { IUser } from "./User";

interface IItem {
  name: string;
  description?: string;
  boughtFor: number;
  usedFor: string;
  owner: IUser["_id"];
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: { type: String },
  boughtFor: { type: Number, required: true },
  usedFor: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Item = model<IItem>("Item", itemSchema);

export default Item;
