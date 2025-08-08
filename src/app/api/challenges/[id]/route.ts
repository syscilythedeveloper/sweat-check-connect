import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id: challengeId } = await params;
    console.log("Fetching challenge details for ID:", challengeId);

    // Fetch the specific challenge with all related data
    const challenge = await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            joinedAt: "asc",
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    // Check if the current user is a participant
    const isParticipant = challenge.participants.some(
      (participant) => participant.userId === signedInUserId
    );

    // Check if the current user is the creator
    const isCreator = challenge.createdById === signedInUserId;

    console.log("Challenge found:", challenge.title);
    console.log("Is participant:", isParticipant);
    console.log("Is creator:", isCreator);

    return NextResponse.json({
      challenge,
      isParticipant,
      isCreator,
    });
  } catch (error) {
    console.error("Error fetching challenge:", error);
    return NextResponse.json(
      { error: "Failed to fetch challenge" },
      { status: 500 }
    );
  }
}
