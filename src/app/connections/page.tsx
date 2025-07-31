"use client";
import React, { useState, useEffect } from "react";
import { TabButton } from "@/components/TabButton";

import { Search, Users } from "lucide-react";

import { connectionType, ConnectionCardProps } from "@/types/connections";
import {
  getFollowers,
  getFollowing,
  getNewConnections,
} from "@/utils/connectionFunctions";
import SkeletonCard from "@/components/Challenges/SkeletonCard";
import ConnectionCard from "@/components/Connections/ConnectionCard";

const Connections = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
    <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_0_10px_2px_rgba(168,85,247,0.4)] p-6 ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Connections
            </h1>
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
            label="New Connections"
            count={newConnections.length}
            isActive={activeTab === connectionType.not_connected}
            onClick={() => setActiveTab(connectionType.not_connected)}
            icon={<Users className="w-4 h-4" />}
          />

          <TabButton
            label="Followers"
            count={followers.length}
            isActive={activeTab === connectionType.followed_by}
            onClick={() => setActiveTab(connectionType.followed_by)}
            icon={<Users className="w-4 h-4" />}
          />
          <TabButton
            label="Following"
            count={following.length}
            isActive={activeTab === connectionType.following}
            onClick={() => setActiveTab(connectionType.following)}
            icon={<Users className="w-4 h-4" />}
          />
        </div>
      </div>
      {/* Content */}
      {/* Challenges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : displayedConnections.map((connection) => (
              <ConnectionCard
                key={connection.id}
                connection={connection}
                connectionStatus={activeTab}
              />
            ))}
      </div>
    </div>
  );
};

export default Connections;
