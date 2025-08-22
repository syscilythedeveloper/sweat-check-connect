import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();
    const { userId: followerId } = getAuth(request);

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

    const followingId = userToFollow.id;

    if (followerId === followingId) {
      return NextResponse.json(
        { error: "Cannot follow yourself" },
        { status: 400 }
      );
    }

    // Decide desired status based on target’s privacy at the moment of action
    const desiredStatus = userToFollow.isPrivate
      ? "REQUESTED"
      : ("ACCEPTED" as const);

    // Check existing relationship
    const existing = await prisma.userFollow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
      select: { status: true },
    });

    if (existing) {
      // Hard stop on block
      if (existing.status === "BLOCKED") {
        return NextResponse.json(
          { error: "You are blocked from following this user" },
          { status: 403 }
        );
      }

      // Already following
      if (existing.status === "ACCEPTED") {
        return NextResponse.json(
          {
            message: `Already following @${userToFollow.username}`,
            status: "ACCEPTED",
          },
          { status: 200 }
        );
      }

      // Existing request on file
      if (existing.status === "REQUESTED") {
        // If target toggled to public since the request, auto-accept
        if (desiredStatus === "ACCEPTED") {
          await prisma.userFollow.update({
            where: { followerId_followingId: { followerId, followingId } },
            data: { status: "ACCEPTED" },
          });
          return NextResponse.json(
            {
              message: `Now following @${userToFollow.username}`,
              status: "ACCEPTED",
            },
            { status: 200 }
          );
        }

        return NextResponse.json(
          {
            message: `Follow request already sent to @${userToFollow.username}`,
            status: "REQUESTED",
          },
          { status: 200 }
        );
      }

      // Optional: if you added REJECTED and want to allow re-requesting, you can update here.
      // Otherwise, treat as idempotent.
    }

    // Create new relationship
    await prisma.userFollow.create({
      data: {
        followerId,
        followingId,
        status: desiredStatus,
      },
    });

    // Optional notification only for requests to private accounts
    if (desiredStatus === "REQUESTED") {
      await prisma.notification.create({
        data: {
          userId: followingId, // receiver (target)
          senderId: followerId, // requester
          type: "FOLLOW_REQUEST",
          targetType: "user",
          targetId: followerId,
        },
      });
    }

    return NextResponse.json(
      {
        message:
          desiredStatus === "ACCEPTED"
            ? `Now following @${userToFollow.username}`
            : `Follow request sent to @${userToFollow.username}`,
        status: desiredStatus, // <— "ACCEPTED" | "REQUESTED"
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

export async function DELETE(request: NextRequest) {
  try {
    const { username } = await request.json();
    const { userId: followerId } = getAuth(request);

    if (!followerId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userToUnfollow = await prisma.user.findUnique({
      where: { username },
      select: { id: true, isPrivate: true, username: true },
    });

    if (!userToUnfollow) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const followingId = userToUnfollow.id;

    await prisma.userFollow.delete({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });

    return NextResponse.json(
      { message: `Unfollowed @${userToUnfollow.username}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unfollow error:", error);
    return NextResponse.json(
      { error: "Failed to unfollow user" },
      { status: 500 }
    );
  }
}
