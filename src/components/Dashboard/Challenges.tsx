import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { Users } from "lucide-react";
import { NewChallenge } from "@/types/challenge";

import { GiOnTarget } from "react-icons/gi";
import { joinChallenge } from "@/utils/DashboardFunctions";
import { useUser } from "@clerk/nextjs";

import { Button } from "../ui/button";
import { calculateDaysUntilStart } from "@/utils/challengeFunctions";

const tagColorClasses = [
  "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
  "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
  "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
];

const ChallengeCard = (challenge: NewChallenge) => {
  const {
    title,
    description,
    duration,
    requiredCheckIns,
    maxParticipants,
    createdBy,
    startDate,
    tags,
  } = challenge;

  const daysUntilStart = calculateDaysUntilStart(startDate);
  const { user } = useUser();
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  if (!user) {
    return (
      <div className="text-center p-4">
        Please log in to view challenge details.
      </div>
    );
  }

  const handleJoinChallenge = () => {
    setIsJoining(true);

    joinChallenge(challenge.id)
      .then(() => {
        toast.success(`Successfully joined "${title}"!`, {
          duration: 3000,
          position: "top-center",
        });
        setHasJoined(true);
      })
      .catch((error) => {
        console.error("Error joining challenge:", error);
        toast.error("Failed to join challenge. Please try again.", {
          duration: 3000,
          position: "top-center",
        });
      })
      .finally(() => {
        setIsJoining(false);
      });
  };

  return (
    <div className="flex flex-col h-full bg-accent-foreground dark:bg-background transition-all duration-300 transform hover:scale-[1.02] shadow-slate-glow rounded-2xl">
      {/* Card Header */}
      <div className="flex-1 p-6 pb-4 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3
                className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm"
                style={{ lineHeight: 1.1 }}
              >
                {" "}
                {duration} Day - {title}
              </h3>

              <p className="text-[10px] text-gray-600 dark:text-gray-300 line-clamp-2">
                {description}
              </p>
            </div>

            {/* Stats Row */}

            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-500">
              <span className="text-gray-500 text-[10px]">Created By:</span>
              <Image
                width={20}
                height={20}
                src={createdBy?.avatar || "/images/defaultUser.png"}
                alt={createdBy?.name || createdBy?.username || "Creator"}
                className="w-3 h-3 rounded-full"
              />
              <span>{createdBy?.name || createdBy?.username}</span>
            </div>

            <div className="w-full h-0.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 animate-pulse mt-1" />
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-2">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <GiOnTarget className="w-4 h-4 text-blue-500" />
            <span>Goal: {requiredCheckIns} SweatChecks</span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <Users className="w-4 h-4 text-blue-500" />
            <span>Max: {maxParticipants || 0}</span>
          </div>
        </div>

        {/* Challenge Open Status */}
        <div className="my-6 flex items-center gap-2 justify-center">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Starts in {daysUntilStart} days
          </div>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-[10px] text-gray-900 dark:text-gray-300 justify-center">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full ${
                  tagColorClasses[idx % tagColorClasses.length]
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer - Discover Mode */}
      <div className="px-6 py-2 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-600 flex justify-center items-center">
        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            onClick={handleJoinChallenge}
            disabled={isJoining || hasJoined}
          >
            {isJoining
              ? "Joining..."
              : hasJoined
              ? "Joined!"
              : "Join Challenge"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
