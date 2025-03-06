import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required!"] },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    password: { type: String },
    picture: { type: String },
    provider: {
      type: String,
      required: [
        true,
        "Provider field is required. You have to tell which provider you are using",
      ],
    },
  },
  { timestamps: true }
);

const User = models?.User || model("User", userSchema);

export default User;
