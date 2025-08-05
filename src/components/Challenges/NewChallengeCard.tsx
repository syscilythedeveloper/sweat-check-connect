import React from "react";
import Image from "next/image";

import { CalendarDays, Users } from "lucide-react";
import { NewChallenge } from "@/types/challenge";
import { Separator } from "../ui/separator";
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

  return (
    <div className="flex flex-col h-full bg-accent-foreground rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] shadow-slate-glow">
      {/* Card Header */}
      <div className="flex-1 p-6 pb-4 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="font-bold text-gray-800 dark:text-blue-400 text-sm">
                {title}
              </h3>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-2">
              <div className="flex items-center gap-1">
                <span className="flex items-center">
                  <CalendarDays className="w-5 h-5 mr-1 text-gray-500 drop-shadow" />
                  {duration} Days
                </span>
              </div>

              {/* Participants */}
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4 text-blue-500" />
                <span>{maxParticipants || 0}</span>
              </div>
            </div>

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

            <p className="text-[10px] text-gray-600 dark:text-gray-300 line-clamp-2">
              Challenge Rules: {description}
            </p>
            <p className="text-[10px] text-gray-600 dark:text-gray-300 line-clamp-2">
              Required Check-Ins:{" "}
              <span className="text-blue-500">{requiredCheckIns || 0}</span>
            </p>
            <Separator className="my-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-[1px]" />
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
            onClick={() => alert(`Join Challenge: ${title}`)}
          >
            Join Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
