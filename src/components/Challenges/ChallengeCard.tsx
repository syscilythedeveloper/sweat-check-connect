import React from "react";
import Image from "next/image";
import { Calendar, CheckCircle, Users } from "lucide-react";
import { ChallengeCardProps } from "@/types/challenge";

// Challenge Card Component
const ChallengeCard = ({ challenge }: { challenge: ChallengeCardProps }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
    {/* Card Header */}
    <div className="p-6 pb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">
              {challenge.title}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {challenge.description}
          </p>
        </div>
      </div>

      {/* Challenge Info */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            challenge.category === "Cardio"
              ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
              : challenge.category === "Strength"
              ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
              : challenge.category === "Lifestyle"
              ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
              : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
          }`}
        >
          {challenge.category}
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{challenge.duration} days</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{challenge.participants.toLocaleString()}</span>
        </div>
      </div>

      {/* Progress (if joined) */}
      {challenge.isJoined && (
        <div className="mb-4">
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
      )}

      {/* Creator Info */}
      <div className="flex items-center gap-2 mb-4">
        <Image
          width={24}
          height={24}
          src={challenge.creatorAvatar}
          alt={challenge.creator}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          by {challenge.creator}
        </span>
      </div>
    </div>

    {/* Card Footer */}
    <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-600">
      <div className="flex items-center justify-between">
        {challenge.isJoined ? (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Joined</span>
          </div>
        ) : (
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all text-sm font-medium">
            Join Challenge
          </button>
        )}

        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors text-sm">
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default ChallengeCard;
