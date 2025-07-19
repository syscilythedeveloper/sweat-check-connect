import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Find all users that the signed-in user follows
    const followedUsers = await prisma.follows.findMany({
      where: { followerId: signedInUserId },
      include: { following: true },
    });

    // Extract just the user objects
    const users = followedUsers.map((f) => f.following);

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
