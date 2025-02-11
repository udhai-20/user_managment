import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
 userName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
