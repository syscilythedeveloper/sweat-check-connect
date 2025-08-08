import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.log("Signed-in user ID:", signedInUserId);
    const newChallenges = await getNewChallenges(signedInUserId);
    const userChallenges = await getUserChallenges(signedInUserId);
    const [currentChallenges, pastChallenges] = userChallenges;

    return NextResponse.json({
      newChallenges,
      currentChallenges,
      pastChallenges,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
async function getNewChallenges(userId: string) {
  console.log("Fetching new challenges for user:", userId);

  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  const newChallenges = await prisma.challenge.findMany({
    where: {
      AND: [
        {
          createdById: {
            not: userId,
          },
        },
        {
          participants: {
            none: {
              userId: userId,
            },
          },
        },
        {
          startDate: {
            gte: todaysDate,
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
      createdAt: "desc",
    },
  });

  console.log("Found challenges:", newChallenges.length);
  return newChallenges;
}

async function getUserChallenges(userId: string) {
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);
  const userChallenges = await prisma.challenge.findMany({
    where: {
      AND: [
        {
          participants: {
            some: {
              userId: userId,
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
      createdAt: "desc",
    },
  });

  const inProgressChallenges = userChallenges.filter((challenge) => {
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + challenge.duration - 1);

    return endDate >= todaysDate;
  });

  console.log("Found in-progress challenges:", inProgressChallenges.length);

  const pastChallenges = userChallenges.filter((challenge) => {
    // Calculate end date: endDate = startDate + duration - 1
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + challenge.duration);

    // If endDate < today, it's in the past
    return endDate < todaysDate;
    // Or use isBefore(endDate, todaysDate) if using date-fns
  });

  console.log("Found past challenges:", pastChallenges.length);

  console.log("Found challenges:", userChallenges.length);
  return [inProgressChallenges, pastChallenges];
}

export async function POST(request: NextRequest) {
  try {
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const challengeData = await request.json();

    console.log(
      "API Request Received: Creating challenge with data:",
      challengeData
    );
    const [month, day, year] = challengeData.startDate.split("/").map(Number);
    const startDate = new Date(year, month - 1, day); // month is 0-indexed

    // Create the challenge in the database
    const createdChallenge = await prisma.challenge.create({
      data: {
        title: challengeData.title,
        description: challengeData.description,
        startDate: startDate,
        duration: challengeData.duration,
        maxParticipants: challengeData.maxParticipants,
        requiredCheckIns: challengeData.requiredCheckIns,
        tags: challengeData.tags || [],
        createdById: signedInUserId,
        totalCheckIns: 0,
        // Automatically add the creator as a participant
        participants: {
          create: {
            userId: signedInUserId,
            joinedAt: new Date(),
          },
        },
      },
      include: {
        createdBy: {
          select: {
            username: true,
            name: true,
            avatar: true,
          },
        },
        participants: {
          include: {
            user: {
              select: {
                username: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    console.log("Challenge created successfully:", createdChallenge.id);

    return NextResponse.json(
      {
        success: true,
        challenge: createdChallenge,
        message: "Challenge created and you've been added as a participant!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating challenge:", error);
    return NextResponse.json(
      { error: "Failed to create challenge" },
      { status: 500 }
    );
  }
}
