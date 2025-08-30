import prisma from "../../../../prisma/utils/prisma";

export async function getLeaderboardData() {
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

export async function getGlobalCheckins(currentUserId: string) {
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

export async function getFollowingCheckins(currentUserId: string) {
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
