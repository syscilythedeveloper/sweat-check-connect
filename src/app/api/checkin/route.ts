import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export const runtime = "nodejs"; // ensure Node runtime (not edge)

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type VideoInfo = {
  videoURL: string; // prefer mp4 eager url when available
  publicId: string;
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
  challengeId?: string; // optional
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

  const videoInfo = await getVideoUrl(video);

  await saveCheckIn({ caption, videoInfo: videoInfo, challengeId }, userId);

  return NextResponse.json({ message: "Check-in successful" });
}

export async function getVideoUrl(videoFile: File) {
  const uploadRes = await uploadVideoToCloudinary(videoFile);
  const videoURL = uploadRes.secure_url;
  const publicId = uploadRes.public_id;
  const duration = uploadRes.duration;
  const fileSize = uploadRes.bytes;
  const mimeType = uploadRes.format;

  const videoInfo = { videoURL, publicId, duration, fileSize, mimeType };
  return videoInfo;
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
