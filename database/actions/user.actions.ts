"use server";

import { parseData } from "@/lib/utils";
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

export const getUser = async (email: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email }).select("provider");

    return parseData(user);
  } catch (error: any) {
    throw new Error("Failed to get user", error);
  }
};
