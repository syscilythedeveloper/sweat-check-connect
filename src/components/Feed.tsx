/* eslint-disable @typescript-eslint/no-explicit-any */
/* 
create interface for check in cards
*/

"use client";
import React, { useState } from "react";
import Image from "next/image";
//import { useUser } from "@clerk/nextjs";
import {
  Heart,
  MessageCircle,
  Share,
  Trophy,
  Clock,
  Play,
  Users,
  Plus,
} from "lucide-react";

const Feed = () => {
  //const { user } = useUser();
  const [activeFilter, setActiveFilter] = useState("all");

  // Combined feed data
  const [feedItems] = useState([
    {
      id: "1",
      type: "checkin",
      timestamp: "2h ago",
      user: {
        name: "GymBuddy",
        avatar: "/images/placeholder-avatar-1.png",
        username: "gymbud23",
      },
      content: {
        caption: "Morning HIIT session complete! 💪 New PR today!",
        thumbnailUrl: "/images/workout-thumb-1.jpg",
        duration: "25 min",
        workoutType: "HIIT",
        caloriesBurned: 320,
      },
      engagement: { likes: 24, comments: 8, isLiked: false },
    },
    {
      id: "2",
      type: "challenge",
      timestamp: "3h ago",
      challenge: {
        name: "30-Day Running Streak",
        description: "Run 5K daily for 30 days",
        progress: 50,
        currentDay: 15,
        totalDays: 30,
        participants: 127,
        category: "Cardio",
        isJoined: true,
        difficulty: "Medium",
      },
      engagement: { likes: 31, comments: 12, isLiked: true },
    },
    {
      id: "3",
      type: "checkin",
      timestamp: "6h ago",
      user: {
        name: "IronMan",
        avatar: "/images/placeholder-avatar-3.png",
        username: "iron_mike",
      },
      content: {
        caption: "New deadlift PR! 405lbs 💀",
        thumbnailUrl: "/images/deadlift-thumb.jpg",
        duration: "1h 15min",
        workoutType: "Strength",
        personalRecord: "405 lbs Deadlift",
      },
      engagement: { likes: 67, comments: 23, isLiked: true },
    },
    {
      id: "4",
      type: "challenge",
      timestamp: "8h ago",
      challenge: {
        name: "Push-Up Challenge",
        description: "Build to 100 consecutive push-ups",
        progress: 75,
        currentDay: 32,
        totalDays: 42,
        participants: 234,
        category: "Strength",
        isJoined: false,
        difficulty: "Hard",
      },
      engagement: { likes: 18, comments: 6, isLiked: false },
    },
  ]);

  const filteredItems = feedItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Header with Filter Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Your Feed
          </h1>
          <button className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2">
          <FilterTab
            label="All"
            isActive={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
            count={feedItems.length}
          />
          <FilterTab
            label="Check-ins"
            isActive={activeFilter === "checkin"}
            onClick={() => setActiveFilter("checkin")}
            count={feedItems.filter((item) => item.type === "checkin").length}
          />
          <FilterTab
            label="Challenges"
            isActive={activeFilter === "challenge"}
            onClick={() => setActiveFilter("challenge")}
            count={feedItems.filter((item) => item.type === "challenge").length}
          />
        </div>
      </div>

      {/* Unified Feed */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
          >
            {item.type === "checkin" ? (
              <CheckInCard item={item} />
            ) : (
              <ChallengeCard item={item} />
            )}

            {/* Universal Engagement Bar */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    className={`flex items-center space-x-1 transition-colors ${
                      item.engagement.isLiked
                        ? "text-red-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        item.engagement.isLiked ? "fill-current" : ""
                      }`}
                    />
                    <span className="text-sm">{item.engagement.likes}</span>
                  </button>

                  <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{item.engagement.comments}</span>
                  </button>

                  <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-4">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
          Load More
        </button>
      </div>
    </div>
  );
};

// Filter Tab Component
const FilterTab = ({
  label,
  isActive,
  onClick,
  count,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count: number;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
    }`}
  >
    <span>{label}</span>
    <span
      className={`text-xs px-2 py-1 rounded-full ${
        isActive ? "bg-white/20" : "bg-gray-200 dark:bg-slate-600"
      }`}
    >
      {count}
    </span>
  </button>
);

// Check-in Card Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckInCard = ({ item }: { item: any }) => (
  <>
    <div className="p-4">
      <div className="flex items-center space-x-3 mb-3">
        <Image
          src={item.user.avatar}
          alt={item.user.name}
          width={40}
          height={40}
        />
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {item.user.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{item.user.username}
          </p>
        </div>
      </div>

      <p className="text-gray-800 dark:text-gray-200 mb-3">
        {item.content.caption}
      </p>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded-full">
          <Clock className="w-3 h-3 inline mr-1" />
          {item.content.duration}
        </span>
        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs rounded-full">
          {item.content.workoutType}
        </span>
        {item.content.caloriesBurned && (
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-xs rounded-full">
            🔥 {item.content.caloriesBurned} cal
          </span>
        )}
      </div>
    </div>

    {/* Workout Image/Video */}
    {item.content.thumbnailUrl && (
      <div className="relative">
        <Image
          width={800}
          height={450}
          src={item.content.thumbnailUrl}
          alt="Workout"
          className="w-full h-64 object-cover"
        />
        <button className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
            <Play className="w-6 h-6 text-gray-800 ml-1" />
          </div>
        </button>
      </div>
    )}
  </>
);

// Challenge Card Component
const ChallengeCard = ({ item }: { item: any }) => (
  <div className="p-4">
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800/50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            {item.challenge.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {item.challenge.description}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              item.challenge.category === "Cardio"
                ? "bg-red-100 text-red-700"
                : item.challenge.category === "Strength"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {item.challenge.category}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              item.challenge.difficulty === "Easy"
                ? "bg-green-100 text-green-700"
                : item.challenge.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.challenge.difficulty}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="text-gray-600 dark:text-gray-400">
            {item.challenge.currentDay}/{item.challenge.totalDays} days
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
            style={{ width: `${item.challenge.progress}%` }}
          />
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <Users className="w-4 h-4" />
          {item.challenge.participants} joined
        </span>

        {item.challenge.isJoined ? (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
            Joined ✓
          </span>
        ) : (
          <button className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full hover:from-blue-600 hover:to-purple-600 transition-all">
            Join
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Feed;
