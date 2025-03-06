"use server";

import { connectToDatabase } from "../db";
import User from "../models/user.model";

export const createUser = async ({
  email,
  name,
  password,
}: {
  email: string | null | undefined;
  name: string | null | undefined;
  password: string | null | undefined;
}) => {
  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error(`User ${existingUser.email} already exists`);
      return { success: false };
    }

    await User.create({
      name: name,
      email: email,
      password,
    });
  } catch (error) {
    console.log("Failed to create user", error);
  }
};
