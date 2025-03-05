import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/db";
import User from "@/database/models/user.model";

export async function POST(request: NextRequest) {
  try {
    const { name, email, picture } = await request.json();

    await connectToDatabase();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        picture,
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
