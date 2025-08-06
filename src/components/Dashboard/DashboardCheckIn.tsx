import React from "react";
import { format } from "date-fns";
import Image from "next/image";

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

  return (
    <div className="relative w-full h-full bg-black">
      {/* Video (fills parent) */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        controls
        poster={thumbnailUrl}
        playsInline
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay: User info, Caption (bottom left) */}
      <div className="absolute bottom-8 left-4 z-10 text-white">
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
