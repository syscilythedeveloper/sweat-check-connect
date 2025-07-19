/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Users,
  MessageCircle,
  UserRoundX,
  Grid,
  List,
} from "lucide-react";
import { User } from "@/types/user";

const Connections = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("friends");
  const [viewMode, setViewMode] = useState("grid");
  const [following, setFollowing] = useState<User[]>([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const response = await fetch("/api/connections");
      const usersFollowed = await response.json();
      setFollowing(usersFollowed);
    };
    fetchFollowing();
  }, []);

  const filteredFriends = following.filter(
    (friend) =>
      friend.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.bio?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_0_10px_2px_rgba(168,85,247,0.4)] p-6 ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Your Followers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Athletes you follow
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
            label="Following"
            count={filteredFriends.length}
            isActive={activeTab === "friends"}
            onClick={() => setActiveTab("friends")}
            icon={<Users className="w-4 h-4" />}
          />
        </div>
      </div>
      {/* Content */}
      {activeTab === "friends" ? (
        <FriendsSection
          friends={filteredFriends}
          viewMode={viewMode}
        />
      ) : null}
    </div>
  );
};

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
          You dont follow anyone yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search terms
        </p>
      </div>
    )}
  </div>
);

const FriendCard = ({ friend }: { friend: any }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl  p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_10px_2px_rgba(168,85,247,0.4)]">
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <Image
          width={80}
          height={80}
          src={friend.avatar}
          alt={friend.username}
          className="w-20 h-20 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-400"
        />
      </div>
      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
        @{friend.username}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-200 mb-4 line-clamp-2 italic">
        &quot;{friend.bio}&quot;
      </p>
      <div className="flex space-x-2 w-full">
        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Message
        </button>
        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all">
          <UserRoundX className="w-4 h-4 inline mr-2" />
          Unfollow
        </button>
      </div>
    </div>
  </div>
);

const FriendListItem = ({ friend }: { friend: any }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_0_10px_2px_rgba(168,85,247,0.2)] p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Image
            width={80}
            height={80}
            src={friend.avatar}
            alt={friend.username}
            className="w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-blue-400 to-purple-400"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              @{friend.username}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 italic">
            &quot;{friend.bio}&quot;
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Message
        </button>
        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all">
          <UserRoundX className="w-4 h-4 inline mr-2" />
          Unfollow
        </button>
      </div>
    </div>
  </div>
);

export default Connections;
