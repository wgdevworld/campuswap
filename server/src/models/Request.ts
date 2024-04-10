import { Schema, Types, model } from "mongoose";
import { IUser } from "./User";

export interface IRequest {
  _id: Types.ObjectId;
  fromUser: IUser["_id"];
  toUser: IUser["_id"];
  message?: string;
  items: Types.ObjectId[];
}

const requestSchema = new Schema<IRequest>({
  fromUser: { type: Schema.Types.ObjectId, ref: "User" },
  toUser: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String },
  items: [{ type: Schema.Types.ObjectId, ref: "Item", required: true }],
});

const Request = model<IRequest>("Request", requestSchema);

export default Request;
