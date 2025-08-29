import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const checkInInfo = await req.formData();

  const video = checkInInfo.get("video");
  const caption = checkInInfo.get("caption");
  const challengeId = checkInInfo.get("challengeId");
  const videoURL = await getVideoUrl(video as File);
  postCheckIn(
    videoURL,
    caption !== null ? String(caption) : "",
    challengeId !== null ? String(challengeId) : ""
  );

  return NextResponse.json({ message: "Check-in successful" });
}

export async function getVideoUrl(videoFile: File) {
  console.log("Here is the video,", videoFile);
  const url = URL.createObjectURL(videoFile);
  return url;
}

export const postCheckIn = async (
  videoURL: string,
  caption: string,
  challengeId: string
) => {
  console.log("Posting check-in with video URL:", videoURL);
  console.log("Posting check-in with caption:", caption);
  console.log("Posting check-in with challenge ID:", challengeId);
};
