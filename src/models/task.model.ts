import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  completed: boolean;
  userId: string;
  description:string;
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
