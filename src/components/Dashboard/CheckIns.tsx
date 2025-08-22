//To do: Display reactions (likes, comments, etc.) below the video
import React, { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import Image from "next/image";
import {
  Loader2,
  Volume2,
  VolumeX,
  UserRoundPlus,
  Clock3,
  Check,
} from "lucide-react";
import { FollowStatus } from "@/types/connections";
import { followUser, unfollowUser } from "@/utils/userInteractions";
interface Follower {
  id: string;
  status: string;
}

interface CheckInData {
  id: string;
  caption?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  createdAt: string;

  user: {
    username: string;
    avatar: string;
    followers: Follower[];
  };
}

const DashboardCheckIn = (checkIn: CheckInData) => {
  const { caption, videoUrl, thumbnailUrl, createdAt, user } = checkIn;
  //console.log("following status:", user.followers[0].status);
  const [followingStatus, setFollowingStatus] = useState<
    FollowStatus | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [actionInProgress, setActionInProgress] = useState<
    "follow" | "unfollow" | null
  >(null);

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Find a follower with status "ACCEPTED"
    const acceptedFollower = user.followers.find(
      (follower) => follower.status === FollowStatus.accepted
    );

    if (acceptedFollower) {
      setFollowingStatus(FollowStatus.accepted);
    } else {
      setFollowingStatus(FollowStatus.not_following);
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
    setActionInProgress("follow");
    try {
      const res = await followUser(user.username);
      if (res?.status === FollowStatus.accepted)
        setFollowingStatus(FollowStatus.accepted);
      else setFollowingStatus(FollowStatus.requested);
    } finally {
      setIsLoading(false);
      setActionInProgress(null);
    }
  };
  const handleUnfollow = async () => {
    setIsLoading(true);
    setActionInProgress("unfollow");
    try {
      await unfollowUser(user.username);
      setFollowingStatus(FollowStatus.not_following);
    } finally {
      setIsLoading(false);
      setActionInProgress(null);
    }
  };
  console.log("Following status:", followingStatus);

  // Map FollowStatus to FollowButton state
  type FollowState = "NOT_FOLLOWING" | "REQUESTED" | "FOLLOWING";
  let followButtonState: FollowState;
  if (followingStatus === FollowStatus.accepted)
    followButtonState = "FOLLOWING";
  else if (followingStatus === FollowStatus.requested)
    followButtonState = "REQUESTED";
  else followButtonState = "NOT_FOLLOWING";

  function FollowButton({
    state,
    onFollow,
    onUnfollow,
    loading,
    actionInProgress,
  }: {
    state: FollowState;
    onFollow: () => void;
    onUnfollow: () => void;
    loading: boolean;
    actionInProgress: "follow" | "unfollow" | null;
  }) {
    if (loading && actionInProgress === "follow") {
      return (
        <button
          disabled
          className="rounded-full px-3.5 py-1.5 text-sm font-semibold inline-flex items-center gap-1.5 bg-emerald-500 text-white shadow"
          aria-busy="true"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          Following
        </button>
      );
    }
    if (loading && actionInProgress === "unfollow") {
      return (
        <button
          disabled
          className="rounded-full px-3.5 py-1.5 text-sm font-semibold inline-flex items-center gap-1.5 text-white/90 ring-1 ring-white/30"
          aria-busy="true"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          Unfollowing
        </button>
      );
    }
    if (state === "NOT_FOLLOWING") {
      return (
        <button
          onClick={onFollow}
          className="rounded-full px-3.5 py-1.5 text-sm font-semibold inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white shadow"
          aria-label="Follow user"
        >
          <UserRoundPlus className="w-4 h-4" />
          Follow
        </button>
      );
    }
    if (state === "REQUESTED") {
      return (
        <button
          disabled
          className="rounded-full px-3.5 py-1.5 text-sm font-semibold inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30"
          aria-label="Follow request sent"
        >
          <Clock3 className="w-4 h-4" />
          Requested
        </button>
      );
    }
    // FOLLOWING
    return (
      <button
        onClick={onUnfollow}
        className="rounded-full px-3.5 py-1.5 text-sm font-semibold inline-flex items-center gap-1.5 text-white/90 ring-1 ring-white/30 hover:bg-white/10"
        aria-label="Unfollow user"
        aria-pressed="true"
      >
        <Check className="w-4 h-4" />
        Following
      </button>
    );
  }
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
          <FollowButton
            state={followButtonState}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            loading={isLoading}
            actionInProgress={actionInProgress}
          />
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
