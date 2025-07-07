import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const mood = formData.get("mood") as string;
    const workoutStatus = formData.get("workoutStatus") as string;
    const caption = formData.get("caption") as string;
    const media = formData.get("media") as File;
    const mediaType = formData.get("mediaType") as string;

    console.log("Creating check-in:", {
      userId,
      mood,
      workoutStatus,
      caption,
      media: media
        ? {
            name: media.name,
            size: media.size,
            type: media.type,
            mediaType: mediaType,
          }
        : null,
    });

    // Handle media upload based on type
    if (media) {
      if (mediaType === "video") {
        // Handle video upload - you'll need cloud storage for this
        console.log("Uploading video:", {
          name: media.name,
          size: media.size,
          type: media.type,
        });

        // Example: Upload to cloud storage (AWS S3, Cloudinary, etc.)
        // const videoUrl = await uploadVideoToCloud(media);
      } else if (mediaType === "image") {
        // Handle image upload
        console.log("Uploading image:", {
          name: media.name,
          size: media.size,
          type: media.type,
        });

        // Example: Upload to cloud storage
        // const imageUrl = await uploadImageToCloud(media);
      }
    }

    // Save check-in data to database
    // await prisma.checkIn.create({
    //   data: {
    //     userId,
    //     mood,
    //     workoutStatus,
    //     caption,
    //     mediaUrl: media ? uploadedUrl : null,
    //     mediaType: media ? mediaType : null,
    //   }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating check-in:", error);
    return NextResponse.json(
      { error: "Failed to create check-in" },
      { status: 500 }
    );
  }
}
