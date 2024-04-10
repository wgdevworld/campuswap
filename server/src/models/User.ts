import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  contactInfo: string;
  // Include other user fields as required
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactInfo: { type: String, required: true },
  // Define other fields as per your requirements
});

const User = model<IUser>("User", userSchema);

export default User;
