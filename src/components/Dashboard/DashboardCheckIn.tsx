//To do: Display reactions (likes, comments, etc.) below the video
import React, { useRef, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

interface CheckInData {
  id: string;
  caption?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
  user: {
    username: string;
    avatar: string;
  };
}

const DashboardCheckIn = (checkIn: CheckInData) => {
  const { caption, videoUrl, thumbnailUrl, createdAt, user } = checkIn;
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-full bg-background overflow-hidden items-center justify-center rounded-2xl">
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
      <video
        className="w-full h-full object-contain bg-black"
        autoPlay
        muted={isMuted}
        poster={thumbnailUrl}
        playsInline
        loop
        ref={videoRef}
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay sits ON TOP of the video */}
      <div className="absolute bottom-5 left-4 z-20 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Image
            src={user.avatar}
            alt={user.username}
            width={32}
            height={32}
            className="w-10 h-10 rounded-full border border-white"
          />
          <span className="font-bold text-lg">@{user.username}</span>
        </div>
        {caption && (
          <div className="max-w-xs break-words text-base font-medium">
            {caption}
          </div>
        )}
        <p className="text-xs mt-1 opacity-70">
          {format(new Date(createdAt), "MMM d, yyyy h:mm a")}
        </p>
      </div>
    </div>
  );
};
export default DashboardCheckIn;
