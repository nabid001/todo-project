import mongoose, { Schema, type Document } from "mongoose";

export interface IAccount extends Document {
  userId: mongoose.Types.ObjectId;
  provider: string;
  providerAccountId: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    access_token: { type: String },
    refresh_token: { type: String },
    expires_at: { type: Number },
  },
  { timestamps: true }
);

const Account =
  mongoose.models.Account || mongoose.model<IAccount>("Account", AccountSchema);

export default Account;
