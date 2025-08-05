import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    // const url = new URL(request.url);
    // console.log("URL:", url);
    console.log("Signed-in user ID:", signedInUserId);

    const leaderboard = await getLeaderboardData();
    const recentCheckins = await getRecentCheckins(signedInUserId);
    const newChallenges = await getNewChallenges(signedInUserId);

    return NextResponse.json({ leaderboard, recentCheckins, newChallenges });
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

async function getRecentCheckins(userId: string) {
  // const checkins = await prisma.checkIn.findMany({
  //   where: { userId },

  //   include: {
  //     user: {
  //       select: { username: true },
  //     },
  //   },
  // });
  const globalCheckins = await prisma.checkIn.findMany({
    where: {
      userId: {
        not: userId, // Exclude the signed-in user's check-ins
      },
    },
    include: {
      user: {
        select: { username: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5, // Limit to 5 global check-ins
  });
  console.log("Showing global check-ins:", globalCheckins);

  return globalCheckins;
}
async function getNewChallenges(userId: string) {
  console.log("Fetching new challenges for user:", userId);

  // Get challenges where the user is NOT the creator AND not already participating
  const challenges = await prisma.challenge.findMany({
    where: {
      AND: [
        {
          createdById: {
            not: userId, // Exclude challenges created by this user
          },
        },
        {
          participants: {
            none: {
              userId: userId, // Exclude challenges user is already participating in
            },
          },
        },
      ],
    },
    include: {
      createdBy: {
        select: {
          username: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          participants: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc", // Show newest challenges first
    },
  });

  console.log("Found challenges:", challenges.length);
  return challenges;
}
