import { Schema, Types, model } from "mongoose";
import { IUser } from "./User";

export interface IRequest {
  _id: Types.ObjectId;
  fromUser: IUser["_id"];
  toUser: IUser["_id"];
  message?: string;
  wantItem: Types.ObjectId;
  offeredItems: Types.ObjectId[];
}

const requestSchema = new Schema<IRequest>({
  fromUser: { type: Schema.Types.ObjectId, ref: "User" },
  toUser: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String },
  wantItem: {type: Schema.Types.ObjectId, ref: "Item"},
  offeredItems: [{ type: Schema.Types.ObjectId, ref: "Item", required: true }],
});

const Request = model<IRequest>("Request", requestSchema);

export default Request;
