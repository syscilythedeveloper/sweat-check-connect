export default function getVideoUrl(videoId) {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  console.log("Cloudinary URL:", cloudinaryUrl);
  console.log("Video ID:", videoId);

  const videoURL = "Here is the video url created by cloudinary";

  return videoURL;
}
