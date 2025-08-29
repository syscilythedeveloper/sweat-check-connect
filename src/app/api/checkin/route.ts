import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type VideoInfo = {
  videoURL: string;
  duration?: number;
  fileSize?: number;
  format?: string;
  mimeType?: string;
  mp4Url?: string;
  hlsUrl?: string;
};

type CheckInInput = {
  caption: string;
  videoInfo: VideoInfo;
  challengeId?: string;
};

async function uploadVideoToCloudinary(
  file: File,
  opts?: Partial<UploadApiOptions>
) {
  // Convert the incoming Web File to a Node Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "checkins",
        eager: [
          {
            width: 300,
            height: 300,
            crop: "pad",
            audio_codec: "none",
            format: "mp4",
          },
          // generate HLS playlist for adaptive streaming
          { streaming_profile: "hd", format: "m3u8" },
        ],
        eager_async: true,

        ...opts,
      },
      (err, result) => {
        if (err) return reject(err);
        if (!result) return reject(new Error("No result from Cloudinary"));
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}

export async function POST(req: NextRequest) {
  const checkInInfo = await req.formData();
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const video = checkInInfo.get("video");
  const caption = checkInInfo.get("caption") || "";
  const challengeId = checkInInfo.get("challengeId")
    ? String(checkInInfo.get("challengeId"))
    : undefined;

  if (!(video instanceof File)) {
    return NextResponse.json({ error: "Video file missing" }, { status: 400 });
  }

  if (!video.type.startsWith("video/")) {
    return NextResponse.json({ error: "Invalid video type" }, { status: 400 });
  }
  if (typeof caption !== "string" || caption.length === 0) {
    return NextResponse.json({ error: "Invalid caption" }, { status: 400 });
  }

  let videoInfo: VideoInfo;
  try {
    videoInfo = await getVideoUrl(video);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown upload error";

    // Map simple error codes (prefix before ':') to HTTP statuses
    const code = msg.split(":")[0];
    const status =
      code === "NO_FILE" || code === "EMPTY_FILE" || code === "VALIDATION"
        ? 400
        : code === "UPLOAD_FAILED" || code === "MISSING_FIELDS"
        ? 502
        : 500;

    return NextResponse.json({ error: msg }, { status });
  }

  await saveCheckIn({ caption, videoInfo: videoInfo, challengeId }, userId);

  return NextResponse.json({ message: "Check-in successful" });
}

export async function getVideoUrl(videoFile: File) {
  if (!videoFile) {
    throw new Error("No file provided.");
  }
  if (videoFile.size <= 0) {
    throw new Error("File is empty.");
  }
  try {
    const uploadRes = await uploadVideoToCloudinary(videoFile);

    // Guard the fields you rely on
    if (!uploadRes?.secure_url || !uploadRes?.bytes) {
      throw new Error(
        "MISSING_FIELDS: Upload response missing secure_url/bytes."
      );
    }

    const videoURL = uploadRes.secure_url as string;
    const duration =
      typeof uploadRes.duration === "number" ? uploadRes.duration : undefined;
    const fileSize = uploadRes.bytes as number;

    // Cloudinary often gives `format` (e.g., "mp4"); infer a MIME if possible
    const mimeType = uploadRes.format
      ? `video/${String(uploadRes.format).toLowerCase()}`
      : undefined;

    return { videoURL, duration, fileSize, mimeType };
  } catch (e: unknown) {
    const base = e instanceof Error ? e.message : "unknown cause";
    throw new Error(`UPLOAD_FAILED: ${base}`);
  }
}

async function saveCheckIn(
  { caption, videoInfo, challengeId }: CheckInInput,
  userId: string
) {
  const { videoURL, fileSize, mimeType, duration } = videoInfo;

  try {
    const response = await prisma.checkIn.create({
      data: {
        userId: userId,
        challengeId,
        caption,
        videoUrl: videoURL,
        fileSize: fileSize || 32,
        mimeType: mimeType || "video",
        duration: duration,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
