import { Schema, Types, model } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  contactInfo: string;
  verified: boolean;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactInfo: { type: String, required: true },
  verified: {type: Boolean, default: false},
});

const User = model<IUser>("User", userSchema);

export default User;
