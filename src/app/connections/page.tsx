/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
//import { useUser } from "@clerk/nextjs";
import {
  Search,
  UserPlus,
  Users,
  MessageCircle,
  MoreVertical,
  UserCheck,
  UserX,
  Grid,
  List,
} from "lucide-react";

const Connections = () => {
  //const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("friends");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Mock friends data - fetch this from your database
  const [friends] = useState([
    {
      id: "1",
      name: "GymBuddy",
      username: "gymbud23",
      avatar: "/images/placeholder-avatar-1.png",
      bio: "Fitness enthusiast | HIIT lover | Always up for a challenge",
      status: "online",
      mutualFriends: 5,
      joinedDate: "2024-01-15",
      stats: {
        checkIns: 89,
        challenges: 12,
        streak: 7,
      },
      lastActive: "2m ago",
      isFollowing: true,
    },
    {
      id: "2",
      name: "CardioQueen",
      username: "cardio_queen",
      avatar: "/images/placeholder-avatar-2.png",
      bio: "Running enthusiast 🏃‍♀️ | Marathon runner | Health coach",
      status: "online",
      mutualFriends: 3,
      joinedDate: "2024-02-10",
      stats: {
        checkIns: 156,
        challenges: 8,
        streak: 23,
      },
      lastActive: "5m ago",
      isFollowing: true,
    },
    {
      id: "3",
      name: "IronMan",
      username: "iron_mike",
      avatar: "/images/placeholder-avatar-3.png",
      bio: "Powerlifter | Personal trainer | Strength coach",
      status: "offline",
      mutualFriends: 8,
      joinedDate: "2023-11-20",
      stats: {
        checkIns: 234,
        challenges: 15,
        streak: 45,
      },
      lastActive: "2h ago",
      isFollowing: true,
    },
    {
      id: "4",
      name: "HealthyHabits",
      username: "healthy_life",
      avatar: "/images/placeholder-avatar-4.png",
      bio: "Wellness advocate | Yoga instructor | Mindful living",
      status: "online",
      mutualFriends: 2,
      joinedDate: "2024-03-05",
      stats: {
        checkIns: 67,
        challenges: 6,
        streak: 12,
      },
      lastActive: "30m ago",
      isFollowing: true,
    },
    {
      id: "5",
      name: "FlexibilityFirst",
      username: "flexi_fit",
      avatar: "/images/placeholder-avatar-5.png",
      bio: "Mobility specialist | Stretching guru | Recovery expert",
      status: "offline",
      mutualFriends: 1,
      joinedDate: "2024-01-30",
      stats: {
        checkIns: 45,
        challenges: 4,
        streak: 3,
      },
      lastActive: "1d ago",
      isFollowing: true,
    },
  ]);

  // Mock friend requests
  const [friendRequests] = useState([
    {
      id: "req1",
      name: "NewFitness",
      username: "newfit2024",
      avatar: "/images/placeholder-avatar-6.png",
      bio: "Just started my fitness journey! Looking for motivation",
      mutualFriends: 2,
      requestDate: "2 days ago",
    },
    {
      id: "req2",
      name: "YogaMaster",
      username: "yoga_zen",
      avatar: "/images/placeholder-avatar-7.png",
      bio: "Yoga instructor | Meditation teacher | Inner peace seeker",
      mutualFriends: 0,
      requestDate: "5 days ago",
    },
  ]);

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Connections
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Your fitness community
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-slate-700 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-600 text-blue-600 shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-600 text-blue-600 shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search friends by name, username, or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-2">
          <TabButton
            label="Friends"
            count={friends.length}
            isActive={activeTab === "friends"}
            onClick={() => setActiveTab("friends")}
            icon={<Users className="w-4 h-4" />}
          />
          <TabButton
            label="Requests"
            count={friendRequests.length}
            isActive={activeTab === "requests"}
            onClick={() => setActiveTab("requests")}
            icon={<UserPlus className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Content */}
      {activeTab === "friends" ? (
        <FriendsSection
          friends={filteredFriends}
          viewMode={viewMode}
        />
      ) : (
        <RequestsSection requests={friendRequests} />
      )}
    </div>
  );
};

// Tab Button Component
const TabButton = ({
  label,
  count,
  isActive,
  onClick,
  icon,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
    }`}
  >
    {icon}
    <span>{label}</span>
    <span
      className={`text-xs px-2 py-1 rounded-full ${
        isActive
          ? "bg-white/20"
          : "bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-400"
      }`}
    >
      {count}
    </span>
  </button>
);

// Friends Section Component
const FriendsSection = ({
  friends,
  viewMode,
}: {
  friends: any[];
  viewMode: string;
}) => (
  <div>
    {friends.length > 0 ? (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {friends.map((friend) =>
          viewMode === "grid" ? (
            <FriendCard
              key={friend.id}
              friend={friend}
            />
          ) : (
            <FriendListItem
              key={friend.id}
              friend={friend}
            />
          )
        )}
      </div>
    ) : (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          No friends found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search terms
        </p>
      </div>
    )}
  </div>
);

// Friend Card Component (Grid View)
const FriendCard = ({ friend }: { friend: any }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
    <div className="flex flex-col items-center text-center">
      {/* Avatar with status */}
      <div className="relative mb-4">
        <Image
          width={80}
          height={80}
          src={friend.avatar}
          alt={friend.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-400"
        />
        <div
          className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${
            friend.status === "online" ? "bg-green-500" : "bg-gray-400"
          }`}
        ></div>
      </div>

      {/* User Info */}
      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
        {friend.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        @{friend.username}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {friend.bio}
      </p>

      {/* Stats */}
      <div className="flex justify-center space-x-4 mb-4 w-full">
        <div className="text-center">
          <span className="block text-lg font-bold text-blue-600 dark:text-blue-400">
            {friend.stats.checkIns}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Check-ins
          </span>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold text-purple-600 dark:text-purple-400">
            {friend.stats.challenges}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Challenges
          </span>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold text-orange-600 dark:text-orange-400">
            {friend.stats.streak}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Day streak
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2 w-full">
        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Message
        </button>
        <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Last Active */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        {friend.status === "online"
          ? "Online now"
          : `Last seen ${friend.lastActive}`}
      </p>
    </div>
  </div>
);

// Friend List Item Component (List View)
const FriendListItem = ({ friend }: { friend: any }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Avatar with status */}
        <div className="relative">
          <Image
            width={80}
            height={80}
            src={friend.avatar}
            alt={friend.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-blue-400 to-purple-400"
          />
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${
              friend.status === "online" ? "bg-green-500" : "bg-gray-400"
            }`}
          ></div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">
              {friend.name}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              @{friend.username}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {friend.bio}
          </p>

          {/* Stats Row */}
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-blue-600 dark:text-blue-400">
              {friend.stats.checkIns} check-ins
            </span>
            <span className="text-purple-600 dark:text-purple-400">
              {friend.stats.challenges} challenges
            </span>
            <span className="text-orange-600 dark:text-orange-400">
              {friend.stats.streak} day streak
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Message
        </button>
        <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// Friend Requests Section
const RequestsSection = ({ requests }: { requests: any[] }) => (
  <div className="space-y-4">
    {requests.length > 0 ? (
      requests.map((request) => (
        <div
          key={request.id}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={request.avatar}
                alt={request.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-blue-400 to-purple-400"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                  {request.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  @{request.username}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {request.bio}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{request.mutualFriends} mutual friends</span>
                  <span>•</span>
                  <span>Requested {request.requestDate}</span>
                </div>
              </div>
            </div>

            {/* Request Actions */}
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                <UserCheck className="w-4 h-4 inline mr-2" />
                Accept
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
                <UserX className="w-4 h-4 inline mr-2" />
                Decline
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-12">
        <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          No friend requests
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          When people send you friend requests, they will appear here
        </p>
      </div>
    )}
  </div>
);

export default Connections;
