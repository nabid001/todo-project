import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/db";
import User from "@/database/models/user.model";

export async function POST(request: NextRequest) {
  try {
    const { name, email, picture, provider } = await request.json();

    await connectToDatabase();

    let user = await User.findOne({ email });

    if (user && user.provider === "credentials") {
      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            provider,
            picture,
            name,
          },
        },
        { new: true, upset: true }
      );
    }

    if (!user) {
      user = await User.create({
        name,
        email,
        picture,
        provider,
      });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
