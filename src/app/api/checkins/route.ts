import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import prisma from "../../../../prisma/utils/prisma";

enum Privacy {
  public = "public",
  followersOnly = "followersOnly",
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const caption = formData.get("caption") as string;
    const privacy = (formData.get("privacy") as Privacy) || Privacy.public;
    const media = formData.get("media") as File;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.error(`User not found for clerkId: ${userId}`);
      return NextResponse.json(
        {
          error: "User account not found. Please try signing out and back in.",
        },
        { status: 404 }
      );
    }

    const blob = await put(media.name, media, {
      access: "public",
      addRandomSuffix: true,
    });

    const checkIn = await prisma.checkIn.create({
      data: {
        userId: user.id,
        caption,
        privacy,
        videoUrl: blob.url,
        fileName: media.name,
        fileSize: media.size,
        mimeType: media.type,
      },
    });

    return NextResponse.json({ success: true, checkIn });
  } catch (error) {
    console.error("Error creating check-in:", error);
    return NextResponse.json(
      { error: "Failed to create check-in" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    console.log("Search params:", searchParams);
    //need to implement logic to fetch checkins based on userId

    return NextResponse.json("Got it");
  } catch (error) {
    console.error("Error fetching check-ins:", error);
    return NextResponse.json(
      { error: "Failed to fetch check-ins" },
      { status: 500 }
    );
  }
}
