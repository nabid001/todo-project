import { Schema, models, model, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "completed";
  priority: "high" | "medium" | "low";
}

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Todo = models.Todo || model("Todo", todoSchema);

export default Todo;
