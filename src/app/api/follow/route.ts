import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();
    const { userId: followerId } = getAuth(request); // adjust for your auth

    if (!followerId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userToFollow = await prisma.user.findUnique({
      where: { username },
      select: { id: true, isPrivate: true, username: true },
    });

    if (!userToFollow) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Create follow relationship
    const followingId = userToFollow.id;
    const desiredStatus = userToFollow.isPrivate
      ? "PENDING"
      : ("ACCEPTED" as const);

    // Create new relationship
    const existing = await prisma.userFollow.findUnique({
      where: {
        followerId_followingId: { followerId, followingId },
      },
      select: { status: true },
    });

    // Handle existing relationship
    if (existing) {
      if (existing.status === "BLOCKED") {
        return NextResponse.json(
          { error: "You are blocked from following this user" },
          { status: 403 }
        );
      }
      if (existing.status === "ACCEPTED") {
        return NextResponse.json(
          { message: `Already following @${userToFollow.username}` },
          { status: 200 }
        );
      }
      // existing PENDING
      if (desiredStatus === "ACCEPTED") {
        // Target switched to public — auto-accept the pending request
        await prisma.userFollow.update({
          where: { followerId_followingId: { followerId, followingId } },
          data: { status: "ACCEPTED" },
        });
        return NextResponse.json(
          { message: `Now following @${userToFollow.username}` },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { message: `Follow request already sent to @${userToFollow.username}` },
        { status: 200 }
      );
    }

    await prisma.userFollow.create({
      data: {
        followerId,
        followingId,
        status: desiredStatus,
      },
    });

    // Optional: notify the target user only when it's a request (private accounts)
    if (desiredStatus === "PENDING") {
      await prisma.notification.create({
        data: {
          userId: followingId, // receiver (target)
          senderId: followerId, // requester
          type: "FOLLOW_REQUEST",
          targetType: "user",
          targetId: followerId, // who requested
        },
      });
    }

    return NextResponse.json(
      {
        message:
          desiredStatus === "ACCEPTED"
            ? `Now following @${userToFollow.username}`
            : `Follow request sent to @${userToFollow.username}`,
      },
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
