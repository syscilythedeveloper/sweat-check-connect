import React from "react";
import Image from "next/image";
import { HeartPlus, CheckCircle, Users } from "lucide-react";
import { ChallengeCardProps } from "@/types/challenge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { calculateGains } from "@/utils/challengeFunctions";
const tagColorClasses = [
  "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
  "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
  "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
];
// Challenge Card Component
const ChallengeCard = ({ challenge }: { challenge: ChallengeCardProps }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] shadow-blue-glow">
    {/* Card Header */}

    <div className="p-6 pb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-3 w-full">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">
              {challenge.title}
            </h3>
            {challenge.isJoined && (
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 ml-2 flex-shrink-0" />
            )}
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm  text-gray-600 dark:text-gray-300 mb-1">
            {/* Challenge Reward */}
            <div className="flex items-center gap-1">
              <span className="flex items-center">
                <HeartPlus className="w-5 h-5 mr-1 text-green-500 drop-shadow" />
                {calculateGains(challenge.duration)} Gains
              </span>
            </div>

            {/* Participants */}
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{challenge.participants.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
            <span className=" text-gray-500">Created By:</span>
            <Image
              width={20}
              height={20}
              src={challenge.creatorAvatar}
              alt={challenge.creator}
              className="w-3 h-3 rounded-full"
            />
            <span>{challenge.creator}</span>
          </div>
          <Separator className="my-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-[1px]" />
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {challenge.description}
          </p>
        </div>
      </div>

      {challenge.isJoined ? (
        <div className="my-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>
              {challenge.currentDay}/{challenge.duration} days
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${challenge.progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="my-6 flex items-center gap-2 justify-center">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Starts in {challenge.duration - challenge.currentDay} days
          </div>
        </div>
      )}

      {challenge.tags && challenge.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {" "}
          Tags:
          {challenge.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                tagColorClasses[idx % tagColorClasses.length]
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>

    {/* Card Footer */}
    <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-600">
      <div className="flex items-center justify-between">
        {challenge.isJoined ? (
          <Button variant="destructive">Leave Challenge</Button>
        ) : (
          <Button variant="outline">Join Challenge</Button>
        )}

        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors text-sm">
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default ChallengeCard;
