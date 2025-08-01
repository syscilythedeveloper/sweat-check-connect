import { CheckInData } from "@/types/checkIns";
import Image from "next/image";

function getEmbedUrl(url: string) {
  // YouTube Shorts
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  // youtu.be short links
  const youtuMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuMatch) {
    return `https://www.youtube.com/embed/${youtuMatch[1]}`;
  }
  // youtube.com/watch?v=...
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  // Already embed
  if (url.includes("youtube.com/embed/")) {
    return url;
  }
  // Not a YouTube URL, return as is
  return url;
}

const CheckInCard = ({
  userId,
  avatar,
  videoUrl,
  challengeName,
  timestamp,
  caption,
}: CheckInData) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full max-w-md mx-auto">
    {/* Header - Avatar and Username */}
    <div className="flex items-center gap-3 p-4">
      <Image
        width={40}
        height={40}
        src={avatar}
        alt={`${userId}'s avatar`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="text-xs text-gray-800 dark:text-white font-semibold">
        {userId}
      </div>
      {challengeName && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {challengeName}
        </div>
      )}
    </div>

    {/* Video Content */}
    {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
      <iframe
        src={getEmbedUrl(videoUrl)}
        className="w-full max-h-[400px] aspect-video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Check-in video"
      />
    ) : (
      <video
        src={videoUrl}
        controls
        className="w-full max-h-[400px] aspect-video border-2 border-gray-200 dark:border-slate-700 rounded-lg"
      />
    )}

    {/* Caption & Timestamp */}
    <div className="p-4 space-y-1">
      <p className="text-sm text-gray-800 dark:text-gray-100">{caption}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
    </div>
  </div>
);

export default CheckInCard;
