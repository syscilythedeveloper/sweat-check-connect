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
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Header with user info and date */}
      <div className="p-4 border-b border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={user.avatar}
              alt={user.username}
              width={40}
              height={40}
              className="rounded-full w-8 h-8"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                @{user.username}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {format(new Date(createdAt), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Content */}
      <div className="relative aspect-video bg-gray-100 dark:bg-slate-700">
        <video
          className="w-full h-full object-cover"
          controls
          preload="metadata"
          poster={thumbnailUrl}
          playsInline
        >
          <source
            src={videoUrl}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Caption (if exists) */}
      {caption && (
        <div className="p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardCheckIn;
