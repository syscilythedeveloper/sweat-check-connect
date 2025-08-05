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

    return NextResponse.json({ leaderboard, recentCheckins });
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
  console.log("Fetching recent check-ins for user:", userId);

  // First, let's verify the user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true },
  });
  console.log("User found:", user);

  const checkins = await prisma.checkIn.findMany({
    where: { userId },
    // orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { username: true },
      },
    },
  });
  console.log("Check-ins found:", checkins.length);
  console.log("Check-ins data:", checkins);

  return checkins;
}
