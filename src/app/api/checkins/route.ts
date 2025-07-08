import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

import { uploadVideoToStorage } from "../../../lib/storage"; // Adjust the import path as needed

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const caption = formData.get("caption") as string;
    const privacy = formData.get("privacy") as string;
    const media = formData.get("media") as File;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const videoUrl = await uploadVideoToStorage(media);

    const checkIn = await prisma.checkIn.create({
      data: {
        userId: user.id,
        caption,
        privacy,
        videoUrl,
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
