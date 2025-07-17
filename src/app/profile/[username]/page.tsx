/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
//[TODO ] make profile page dynamic for each user
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Users, Trophy, Calendar, MapPin, Clock } from "lucide-react";

// Main Profile Component
const ProfilePage = () => {
  const params = useParams();
  console.log("Profile params:", params);
  const { user } = useUser();

  // You'll eventually fetch this from your database
  const [userProfile, setUserProfile] = useState({
    id: user?.id || "user123",
    name: user?.username || "sys_thealchemist",
    avatar: user?.imageUrl || "/images/user.png",
    bio: "Passionate about fitness, healthy living, and crushing new goals! Join me on my journey to a stronger self.",
    stats: {
      totalCheckIns: 125,
      challengesCompleted: 15,
      friends: 42,
    },
    checkIns: [
      {
        id: "ci1",
        date: "2025-07-07",
        activity: "Morning Run",
        duration: "30 min",
        distance: "5 km",
        notes: "Great start to the week!",
      },
      {
        id: "ci2",
        date: "2025-07-06",
        activity: "Strength Training",
        duration: "60 min",
        notes: "Leg day was brutal but effective.",
      },
      {
        id: "ci3",
        date: "2025-07-05",
        activity: "Yoga Session",
        duration: "45 min",
        notes: "Felt so relaxed and stretched.",
      },
      {
        id: "ci4",
        date: "2025-07-04",
        activity: "Cycling",
        duration: "90 min",
        distance: "25 km",
        notes: "Explored new trails today.",
      },
    ],
    challenges: [
      {
        id: "ch1",
        name: "30-Day Plank Challenge",
        status: "In Progress",
        progress: "Day 20/30",
      },
      {
        id: "ch2",
        name: "1000 Burpee Challenge",
        status: "Completed",
        completedDate: "2025-06-15",
      },
      {
        id: "ch3",
        name: "Morning Yoga Streak",
        status: "In Progress",
        progress: "Day 7/14",
      },
      {
        id: "ch4",
        name: "Marathon Training",
        status: "Upcoming",
        startDate: "2025-08-01",
      },
    ],
    friends: [
      {
        id: "fr1",
        name: "GymBuddy",
        avatar: "/images/placeholder-avatar-1.png",
      },
      {
        id: "fr2",
        name: "CardioQueen",
        avatar: "/images/placeholder-avatar-2.png",
      },
      {
        id: "fr3",
        name: "IronMan",
        avatar: "/images/placeholder-avatar-3.png",
      },
      {
        id: "fr4",
        name: "HealthyHabits",
        avatar: "/images/placeholder-avatar-4.png",
      },
    ],
  });

  const [activeTab, setActiveTab] = useState("checkins");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl dark:shadow-2xl p-6 sm:p-8 lg:p-10 transform transition-all duration-300 hover:shadow-2xl dark:hover:shadow-blue-500/10 border dark:border-slate-700">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 mb-8 pb-8 border-b border-gray-200 dark:border-slate-600">
            <div className="relative">
              <Image
                src={userProfile.avatar}
                alt="User Avatar"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-lg transition-transform duration-300 hover:scale-105"
                width={160}
                height={160}
              />
            </div>

            <div className="text-center sm:text-left flex-grow">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white mb-2 leading-tight">
                {userProfile.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-4 italic">
                {userProfile.bio}
              </p>

              {/* Stats */}
              <div className="flex justify-center sm:justify-start space-x-6">
                <div className="text-center">
                  <span className="block text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {userProfile.stats.totalCheckIns}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Check-ins
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {userProfile.stats.challengesCompleted}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Challenges
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {userProfile.stats.friends}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Friends
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center sm:justify-start mb-8 space-x-2 sm:space-x-4 border-b border-gray-200 dark:border-slate-600 pb-4">
            <TabButton
              label="Check-ins"
              isActive={activeTab === "checkins"}
              onClick={() => setActiveTab("checkins")}
            />
            <TabButton
              label="Challenges"
              isActive={activeTab === "challenges"}
              onClick={() => setActiveTab("challenges")}
            />
            <TabButton
              label="Friends"
              isActive={activeTab === "friends"}
              onClick={() => setActiveTab("friends")}
            />
          </div>

          {/* Content Sections */}
          <div>
            {activeTab === "checkins" && (
              <CheckInsSection checkIns={userProfile.checkIns} />
            )}
            {activeTab === "challenges" && (
              <ChallengesSection challenges={userProfile.challenges} />
            )}
            {activeTab === "friends" && (
              <FriendsSection friends={userProfile.friends} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Tab Button Component
const TabButton = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    className={`px-6 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 transform
      ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
          : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 hover:text-gray-800 dark:hover:text-white hover:scale-105"
      }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// Check-ins Section Component
const CheckInsSection = ({ checkIns }: { checkIns: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <h2 className="col-span-full text-3xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
      <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      Recent Check-ins
    </h2>
    {checkIns.length > 0 ? (
      checkIns.map((checkIn) => (
        <div
          key={checkIn.id}
          className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 shadow-sm border border-blue-100 dark:border-blue-800/50 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-blue-500/10"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {checkIn.date}
          </p>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
            {checkIn.activity}
          </h3>
          {checkIn.duration && (
            <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Duration: {checkIn.duration}
            </p>
          )}
          {checkIn.distance && (
            <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Distance: {checkIn.distance}
            </p>
          )}
          <p className="text-gray-700 dark:text-gray-300 mt-2 italic">
            {checkIn.notes}
          </p>
        </div>
      ))
    ) : (
      <p className="col-span-full text-gray-500 dark:text-gray-400 text-center text-lg">
        No check-ins yet. Time to get started! 💪
      </p>
    )}
  </div>
);

// Challenges Section Component
const ChallengesSection = ({ challenges }: { challenges: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <h2 className="col-span-full text-3xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
      <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      My Challenges
    </h2>
    {challenges.length > 0 ? (
      challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 shadow-sm border border-green-100 dark:border-green-800/50 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-green-500/10"
        >
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            {challenge.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Status:{" "}
            <span
              className={`font-medium px-2 py-1 rounded-full text-xs
              ${
                challenge.status === "In Progress"
                  ? "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400"
                  : challenge.status === "Completed"
                  ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              {challenge.status}
            </span>
          </p>
          {challenge.progress && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Progress: {challenge.progress}
            </p>
          )}
          {challenge.completedDate && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Completed: {challenge.completedDate}
            </p>
          )}
          {challenge.startDate && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Starts: {challenge.startDate}
            </p>
          )}
        </div>
      ))
    ) : (
      <p className="col-span-full text-gray-500 dark:text-gray-400 text-center text-lg">
        No challenges found. Ready to take on something new? 🎯
      </p>
    )}
  </div>
);

// Friends Section Component
const FriendsSection = ({ friends }: { friends: any[] }) => (
  <div>
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
      <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      My Fitness Crew
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {friends.length > 0 ? (
        friends.map((friend) => (
          <div
            key={friend.id}
            className="flex flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 shadow-sm border border-purple-100 dark:border-purple-800/50 transform transition-all duration-200 hover:scale-[1.05] hover:shadow-lg dark:hover:shadow-purple-500/10 cursor-pointer"
          >
            <Image
              src={friend.avatar}
              alt={friend.name}
              className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-purple-300 dark:border-purple-500 shadow-md"
              width={64}
              height={64}
            />
            <p className="text-md font-medium text-purple-700 dark:text-purple-300 text-center">
              {friend.name}
            </p>
            <button className="mt-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full hover:from-purple-600 hover:to-pink-600 transition-all">
              View Profile
            </button>
          </div>
        ))
      ) : (
        <p className="col-span-full text-gray-500 dark:text-gray-400 text-center text-lg">
          No friends added yet. Start connecting! 🤝
        </p>
      )}
    </div>
  </div>
);

export default ProfilePage;
