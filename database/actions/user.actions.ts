"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";
import User from "../models/user.model";
import { CreateUserParams, UpdateUserParams } from "@/types/types";

export async function createUser({
  clerkId,
  name,
  username,
  email,
  picture,
}: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create({
      clerkId,
      username,
      name,
      email,
      picture,
    });

    return newUser;
  } catch (error) {
    console.log("Error creating user", error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log("Error updating user", error);
    throw error;
  }
}

export async function deleteUser({ clerkId }: { clerkId: string }) {
  try {
    await connectToDatabase();

    const existedUser = await User.findOne({ clerkId });
    if (!existedUser) {
      throw new Error("User not found");
    }

    await User.deleteOne({ clerkId });
  } catch (error) {
    console.log("Failed to delete user", error);
    throw error;
  }
}
