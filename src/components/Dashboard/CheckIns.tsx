//To do: Display reactions (likes, comments, etc.) below the video
import React, { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import Image from "next/image";
import {
  Loader2,
  Volume2,
  VolumeX,
  UserRoundPlus,
  UserRoundMinus,
} from "lucide-react";
import { followUser, unfollowUser } from "@/utils/userInteractions";
interface CheckInData {
  id: string;
  caption?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  createdAt: string;

  user: {
    username: string;
    avatar: string;
    followers: string[];
  };
  status: string;
}

const DashboardCheckIn = (checkIn: CheckInData) => {
  const { caption, videoUrl, thumbnailUrl, createdAt, user } = checkIn;
  const [followingStatus, setFollowingStatus] = useState("PENDING");
  const [isLoading, setIsLoading] = useState(false);

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (user.followers.length > 0) {
      setFollowingStatus("FOLLOWING");
    } else {
      setFollowingStatus("PENDING");
    }
  }, [user.followers]);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const res = await followUser(user.username); // await!
      // If your API returns status, set accordingly:
      if (res?.status === "ACCEPTED") setFollowingStatus("FOLLOWING");
      else setFollowingStatus("PENDING");
    } finally {
      setIsLoading(false);
    }
  };
  const handleUnfollow = async () => {
    setIsLoading(true);
    try {
      await unfollowUser(user.username);
      setFollowingStatus("PENDING");
    } finally {
      setIsLoading(false);
    }
  };

  const isPendingLoading = followingStatus === "PENDING" && isLoading;

  return (
    <div className="relative w-full h-full bg-background overflow-y-clip items-center justify-center rounded-2xl">
      <button
        onClick={toggleMute}
        className="absolute top-12 right-4 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>

      <video
        className="w-full h-full object-contain"
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
      <div className="absolute w-full bottom-51 z-20 text-white bg-black/50 p-2 ">
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Image
              src={user.avatar}
              alt={user.username}
              width={32}
              height={32}
              className="w-10 h-10 rounded-full border border-white"
            />
            <span className="font-bold text-lg">@{user.username}</span>
          </div>

          {followingStatus === "PENDING" && (
            <button
              onClick={handleFollow}
              disabled={isLoading}
              aria-busy={isLoading}
              className={`
    rounded-full p-2 text-white transition-colors
    ${isPendingLoading ? "bg-green-600 hover:bg-green-700" : "bg-black"}
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
            >
              {isPendingLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <UserRoundPlus className="w-5 h-5" />
              )}
            </button>
          )}
          {followingStatus === "FOLLOWING" && (
            <button
              onClick={handleUnfollow}
              disabled={isLoading}
              className={`
    rounded-full p-2 text-white transition-colors
    ${isPendingLoading ? "bg-yellow-600 hover:bg-yellow-700" : "bg-black"}
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
            >
              <UserRoundMinus className="w-5 h-5" />
            </button>
          )}
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
