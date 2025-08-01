"use client";
import React, { useState, useEffect } from "react";
import { TabButton } from "@/components/TabButton";

import { Search, Users, UserPlus, UserCheck, UserSearch } from "lucide-react";

import { connectionType, ConnectionCardProps } from "@/types/connections";
import {
  getFollowers,
  getFollowing,
  getNewConnections,
} from "@/utils/connectionFunctions";
import SkeletonCard from "@/components/Challenges/SkeletonCard";
import ConnectionCard from "@/components/Connections/ConnectionCard";

const Connections = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<connectionType>(
    connectionType.following
  );
  const [following, setFollowing] = useState<ConnectionCardProps[]>([]);
  const [followers, setFollowers] = useState<ConnectionCardProps[]>([]);
  const [newConnections, setNewConnections] = useState<ConnectionCardProps[]>(
    []
  );

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getFollowing("someUserId"),
      getFollowers("someUserId"),
      getNewConnections("someUserId"),
    ]).then(([followingData, followersData, newConnectionsData]) => {
      setFollowing(followingData);
      setFollowers(followersData);
      setNewConnections(newConnectionsData);
      setIsLoading(false);
    });
  }, []);

  let displayedConnections: ConnectionCardProps[] = [];
  if (activeTab === connectionType.following) {
    displayedConnections = following;
  } else if (activeTab === connectionType.followed_by) {
    displayedConnections = followers;
  } else if (activeTab === connectionType.not_connected) {
    displayedConnections = newConnections;
  }

  return (
    <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-2 space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-blue-glow  border-1 border-blue-900/50 p-2 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              <UserPlus className="inline-block w-6 h-6 mr-2" />
              Connections
            </h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-3 sm:mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search connections"
              onChange={(e) => console.log(e.target.value)}
              className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 sm:gap-3 text-[6px] font-bold sm:text-lg items-center justify-center">
          <TabButton
            label="New"
            count={newConnections.length}
            isActive={activeTab === connectionType.not_connected}
            onClick={() => setActiveTab(connectionType.not_connected)}
            icon={
              <UserSearch className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
          <TabButton
            label="Following"
            count={followers.length}
            isActive={activeTab === connectionType.followed_by}
            onClick={() => setActiveTab(connectionType.followed_by)}
            icon={
              <Users className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
          <TabButton
            label="Followers"
            count={following.length}
            isActive={activeTab === connectionType.following}
            onClick={() => setActiveTab(connectionType.following)}
            icon={
              <UserCheck className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
        </div>
      </div>
      {/* Content */}
      {/* Connections List */}
      <div className="flex flex-col gap-4 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-slate-glow mt-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : displayedConnections.map((connection) => (
              <ConnectionCard
                key={connection.id}
                connection={connection}
                connectionStatus={activeTab}
                userFollows={
                  activeTab === connectionType.followed_by
                    ? connection.userFollows
                    : undefined
                }
              />
            ))}
      </div>
    </div>
  );
};

export default Connections;
