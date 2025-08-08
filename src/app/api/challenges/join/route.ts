import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    // Get signed-in userId from Clerk
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { challengeId } = await request.json();
    if (!challengeId) {
      return NextResponse.json(
        { error: "Missing challengeId" },
        { status: 400 }
      );
    }

    // Check if challenge exists
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
      select: { id: true, maxParticipants: true, participants: true },
    });

    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    // Prevent duplicate join
    const existing = await prisma.userChallenge.findUnique({
      where: {
        userId_challengeId: {
          userId: signedInUserId,
          challengeId: challengeId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "You already joined this challenge." },
        { status: 200 }
      );
    }

    // Optionally: Enforce max participants
    if (
      challenge.maxParticipants &&
      challenge.participants.length >= challenge.maxParticipants
    ) {
      return NextResponse.json(
        { error: "This challenge is full." },
        { status: 403 }
      );
    }

    // Add to UserChallenge
    const participant = await prisma.userChallenge.create({
      data: {
        userId: signedInUserId,
        challengeId: challengeId,
      },
    });

    return NextResponse.json(
      {
        message: `User ${signedInUserId} joined challenge ${challengeId}`,
        participant,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Join challenge error:", error);
    return NextResponse.json(
      { error: "Failed to join challenge" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get signed-in userId from Clerk
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { challengeId } = await request.json();
    if (!challengeId) {
      return NextResponse.json(
        { error: "Missing challengeId" },
        { status: 400 }
      );
    }

    // Check if user is currently in the challenge
    const existing = await prisma.userChallenge.findUnique({
      where: {
        userId_challengeId: {
          userId: signedInUserId,
          challengeId: challengeId,
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "You are not part of this challenge." },
        { status: 200 }
      );
    }

    // Remove the participant
    await prisma.userChallenge.delete({
      where: {
        userId_challengeId: {
          userId: signedInUserId,
          challengeId: challengeId,
        },
      },
    });

    return NextResponse.json(
      { message: `User ${signedInUserId} left challenge ${challengeId}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Leave challenge error:", error);
    return NextResponse.json(
      { error: "Failed to leave challenge" },
      { status: 500 }
    );
  }
}
