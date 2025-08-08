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
    const [currentChallenges, createdChallenges] = userChallenges;

    return NextResponse.json({
      newChallenges,
      currentChallenges,
      createdChallenges,
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

    // Only include challenges that are still active AND user didn't create
    return endDate >= todaysDate && challenge.createdById !== userId;
  });

  console.log("Found in-progress challenges:", inProgressChallenges.length);

  const createdChallenges = userChallenges.filter((challenge) => {
    return challenge.createdById === userId;
  });

  console.log("Found past challenges:", createdChallenges.length);

  console.log("Found challenges:", userChallenges.length);
  return [inProgressChallenges, createdChallenges];
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

export async function DELETE(request: NextRequest) {
  try {
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { challengeId } = await request.json();
    console.log("API Request Received: Deleting challenge", challengeId);

    // Check if the challenge exists and the user is authorized to delete it
    const challenge = await prisma.challenge.findUnique({
      where: {
        id: challengeId,
        createdById: signedInUserId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!challenge) {
      return NextResponse.json(
        {
          error:
            "Challenge not found or you don't have permission to delete it",
        },
        { status: 404 }
      );
    }

    // Delete all participants first (to avoid foreign key constraint)
    await prisma.userChallenge.deleteMany({
      where: { challengeId: challengeId },
    });

    // Then delete the challenge
    await prisma.challenge.delete({
      where: { id: challengeId },
    });

    console.log("Challenge deleted successfully:", challengeId);

    return NextResponse.json(
      { success: true, message: "Challenge deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting challenge:", error);
    return NextResponse.json(
      { error: "Failed to delete challenge" },
      { status: 500 }
    );
  }
}
