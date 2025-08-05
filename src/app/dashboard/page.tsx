/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { TabButton } from "@/components/TabButton";
import { BicepsFlexed, Search, Users } from "lucide-react";
import SkeletonCard from "@/components/Challenges/SkeletonCard";
import { NewChallenge } from "@/types/challenge";
import { DashboardDisplay, LeaderboardData } from "@/types/userDetails";

import Leaderboard from "@/components/Dashboard/Leaderboard";
import DashboardCheckIn from "@/components/Dashboard/DashboardCheckIn";
import NewChallengeCard from "@/components/Challenges/NewChallengeCard";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const { user } = useUser();
  // Add loading state for initial render
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newChallenges, setNewChallenges] = useState<NewChallenge[]>([]);
  const [recentCheckIns, setRecentCheckIns] = useState<any[]>([]);
  const [leaderboard, setLeaderboardData] = useState<LeaderboardData[]>([]);

  const [activeTab, setActiveTab] = useState<any>(
    DashboardDisplay.challenge_discovery
  );

  // Prevent hydration issues by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // In your dashboard component
  useEffect(() => {
    if (mounted) {
      const fetchDashboardData = async () => {
        setIsLoading(true);

        try {
          const response = await fetch(`/api/dashboard?userId=${user}`);

          if (!response.ok) {
            throw new Error("Failed to fetch dashboard data");
          }
          const data = await response.json();
          console.log("Fetched dashboard data:", data);

          setLeaderboardData(data.leaderboard);
          console.log("Fetched leaderboard data:", data.leaderboard);

          setRecentCheckIns(data.recentCheckins); // Note: 'recentCheckins' not 'recentCheckIns'
          console.log("recent check in data:", data.recentCheckins);

          setNewChallenges(data.newChallenges);
          console.log("Fetched new challenges:", data.newChallenges);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          // Handle error state here
        } finally {
          setIsLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [mounted, user]);

  // Don't render anything until client-side mount is complete
  if (!mounted) return null;

  return (
    <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-2 space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-blue-glow  border-1 border-blue-900/50 p-2 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-blue-400 flex  gap-2">
              Sweat Checks
            </h1>
          </div>
        </div>
        {/* Search and Tabs */}

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 sm:gap-3 text-[6px] font-bold sm:text-lg items-center justify-center">
          <TabButton
            label="Find Challenges"
            isActive={activeTab === DashboardDisplay.challenge_discovery}
            onClick={() => setActiveTab(DashboardDisplay.challenge_discovery)}
            icon={
              <Search className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
          <TabButton
            label="Sweat Checks"
            isActive={activeTab === DashboardDisplay.check_ins}
            onClick={() => setActiveTab(DashboardDisplay.check_ins)}
            icon={
              <BicepsFlexed className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
          <TabButton
            label="Leaderboard"
            isActive={activeTab === DashboardDisplay.leaderboard}
            onClick={() => setActiveTab(DashboardDisplay.leaderboard)}
            icon={
              <Users className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
        </div>
      </div>

      {/* Content Area */}
      {activeTab === DashboardDisplay.challenge_discovery ? (
        // Challenge Discovery with Search
        <div className="bg-blue-50/50 dark:bg-slate-800/60 rounded-xl p-4 shadow-slate-glow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : newChallenges.map((challenge) => (
                  <NewChallengeCard
                    key={challenge.id}
                    {...challenge}
                  />
                ))}
          </div>
        </div>
      ) : activeTab === DashboardDisplay.check_ins ? (
        // Scrollable Check-ins Layout
        <div className="bg-blue-50/50 dark:bg-slate-800/60 rounded-xl p-4 shadow-slate-glow">
          <div className="h-96 overflow-y-auto space-y-2 pr-2">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : recentCheckIns.map((checkIn, index: number) => (
                  <DashboardCheckIn
                    key={index}
                    {...checkIn}
                  />
                ))}
          </div>
        </div>
      ) : (
        // Leaderboard Layout
        <div className="rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-blue-50/50 dark:bg-slate-800/60 gap-1 sm:gap-2">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : leaderboard.map((leader: LeaderboardData, index: number) => (
                <Leaderboard
                  key={index}
                  username={leader.username}
                  daysActive={leader.daysActive}
                  avatar={leader.avatar}
                  currentActiveStreak={leader.currentActiveStreak}
                  longestActiveStreak={leader.longestActiveStreak}
                  rank={index + 1}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
