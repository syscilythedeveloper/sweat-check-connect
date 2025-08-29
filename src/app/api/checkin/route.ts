import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

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
  video: VideoInfo;
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

  // const videoInfo = await getVideoUrl(video);
  const videoInfo = {
    videoURL: "",
    publicId: "",
    duration: 21,
    fileSize: 32,
    mimeType: video.type,
  };

  await saveCheckIn({ caption, video: videoInfo, challengeId });

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

export const postSoloCheckIn = async (
  // this is the function to post the check-in data to prisma
  videoInfo: {
    videoURL: string;
    publicId: string;
    duration: number;
    fileSize: number;
    mimeType: string;
  },
  caption: string
) => {
  console.log("Posting solo check in");
  console.log("Posting check-in with video info:", videoInfo);
  console.log("Posting check-in with caption:", caption);
};

export const postChallengeCheckIn = async (
  // this is the function to post the check-in data to prisma
  videoInfo: {
    videoURL: string;
    publicId: string;
    duration: number;
    fileSize: number;
    mimeType: string;
  },
  caption: string,
  challengeId: string
) => {
  console.log("Posting challenge check-in");
  console.log("Posting check-in with video info:", videoInfo);
  console.log("Posting check-in with caption:", caption);
  console.log("Posting check-in with challenge ID:", challengeId);
};

async function saveCheckIn({ caption, video, challengeId }: CheckInInput) {
  // Example Prisma shape — adjust to your actual schema
  // await prisma.checkIn.create({
  //   data: {
  //     caption,
  //     challengeId,             // optional, Prisma will store null if undefined
  //     videoPublicId: video.publicId,
  //     videoUrl: video.videoURL,
  //     videoMp4Url: video.mp4Url,
  //     videoHlsUrl: video.hlsUrl,
  //     videoDuration: video.duration,
  //     videoBytes: video.fileSize,
  //     videoFormat: video.format,
  //     videoMimeType: video.mimeType,
  //     status: "ready",
  //   },
  // });
  console.log("Saving check-in", { caption, challengeId, video });
}
