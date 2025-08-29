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
  const caption = checkInInfo.get("caption");
  const challengeId = checkInInfo.get("challengeId");
  if (!(video instanceof File)) {
    return NextResponse.json({ error: "Video file missing" }, { status: 400 });
  }

  if (!video.type.startsWith("video/")) {
    return NextResponse.json({ error: "Invalid video type" }, { status: 400 });
  }

  const videoInfo = await getVideoUrl(video);

  postCheckIn(
    videoInfo,
    caption !== null ? String(caption) : "",
    challengeId !== null ? String(challengeId) : ""
  );

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

export const postCheckIn = async (
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
  console.log("Posting check-in with video info:", videoInfo);
  console.log("Posting check-in with caption:", caption);
  console.log("Posting check-in with challenge ID:", challengeId);
};
