import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    // const url = new URL(request.url);
    // console.log("URL:", url);
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const leaderboard = await getLeaderboardData();
    const globalCheckIns = await getGlobalCheckins(signedInUserId);
    const followingCheckIns = await getFollowingCheckins(signedInUserId);

    return NextResponse.json({
      leaderboard,
      globalCheckIns,
      followingCheckIns,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

async function getLeaderboardData() {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      name: true,
      avatar: true,
      daysActive: true,
      currentActiveStreak: true,
      longestActiveStreak: true,
    },
    orderBy: [
      { daysActive: "desc" },
      { currentActiveStreak: "desc" }, // Tiebreaker
      { username: "asc" }, // Secondary tiebreaker
    ],
    take: 10,
    where: {
      daysActive: {
        gt: 0, // Only include users with active days
      },
    },
  });
  return users;
}

async function getGlobalCheckins(currentUserId: string) {
  const globalCheckins = await prisma.checkIn.findMany({
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
          name: true,
          isPrivate: true,
          followers: {
            where: { followerId: currentUserId },
            select: { status: true },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });

  return globalCheckins;
}
async function getFollowingCheckins(currentUserId: string) {
  const following = await prisma.userFollow.findMany({
    where: { followerId: currentUserId, status: "ACCEPTED" },
    select: { followingId: true },
  });

  const followingIds = following.map((f) => f.followingId);
  if (followingIds.length === 0) return [];

  const followingCheckIns = await prisma.checkIn.findMany({
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
          name: true,
          isPrivate: true,
          followers: {
            where: { followerId: currentUserId },
            select: { status: true },
            take: 1,
          },
        },
      },
    },
    where: {
      userId: { in: followingIds },
    },
    orderBy: {
      createdAt: "desc", // Show newest challenges first
    },
    take: 30,
    //_count: { select: {reactions:true, comments:true}} ----> use this later for when you need to display the count of any query results
  });
  return followingCheckIns;
}
