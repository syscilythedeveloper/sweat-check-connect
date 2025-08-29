export function soloCheckin(userId: string) {
  if (!userId) return;
  console.log(`Solo check-in for user ${userId}`);
  return { userId };
  //make db call to update user check ins.
}

export function challengeCheckIn(challengeId: string, userId: string) {
  if (!challengeId || !userId) return;
  console.log(
    `Challenge check-in for user ${userId} to challenge ${challengeId}`
  );
  return { challengeId, userId };
}

export default function getVideoUrl(videoId: string) {
  //make post req to api/cloudinary
  console.log("Video ID:", videoId);

  const videoURL = "Here is the video url created by cloudinary";

  return videoURL;
}
