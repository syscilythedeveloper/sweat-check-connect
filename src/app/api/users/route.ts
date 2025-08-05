import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return;
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    // 1. Get signed-in user ID
    const { userId: followerId } = getAuth(request); // adjust for your auth

    if (!followerId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2. Find user to follow
    const userToFollow = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!userToFollow) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Create follow relationship

    return NextResponse.json(
      { message: `Now following ${username}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Follow error:", error);
    return NextResponse.json(
      { error: "Failed to follow user" },
      { status: 500 }
    );
  }
}
