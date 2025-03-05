"use server";

import { connectToDatabase } from "../db";
import User from "../models/user.model";

export const createUser = async ({
  email,
  name,
  image,
}: {
  email: string | null | undefined;
  name: string | null | undefined;
  image: string | null | undefined;
}) => {
  try {
    await connectToDatabase();

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      existingUser = await User.create({
        name: name,
        email: email,
        picture: image,
      });
    }
  } catch (error) {
    console.log("Failed to create user", error);
  }
};
