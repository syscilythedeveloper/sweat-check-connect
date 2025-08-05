/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { TabButton } from "@/components/TabButton";
import { BicepsFlexed, Search, Users } from "lucide-react";
import SkeletonCard from "@/components/Challenges/SkeletonCard";
import { getNewChallenges } from "@/utils/challengeFunctions";
import { ChallengeCardProps } from "@/types/challenge";
import { DashboardDisplay, LeaderboardData } from "@/types/userDetails";
import ChallengeCard from "@/components/Challenges/ChallengeCard";
import {
  getRecentCheckIns,
  getLeaderboardData,
} from "@/utils/userDetailFunctions";
import { RecentCheckIns } from "@/types/userDetails";
import PreviousCheckIns from "@/components/Dashboard/PreviousCheckIns";
import Leaderboard from "@/components/Dashboard/Leaderboard";

const Dashboard = () => {
  // Add loading state for initial render
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newChallenges, setNewChallenges] = useState<ChallengeCardProps[]>([]);
  const [recentCheckIns, setRecentCheckIns] = useState<RecentCheckIns[]>([]);
  const [leaderboard, setLeaderboardData] = useState<LeaderboardData[]>([]);

  const [activeTab, setActiveTab] = useState<any>(
    DashboardDisplay.challenge_discovery
  );

  // Prevent hydration issues by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setIsLoading(true);

      Promise.all([
        getNewChallenges("someUserId"),
        getRecentCheckIns("someUserId"),
        getLeaderboardData(),
      ]).then(([newChallenges, recentCheckins, leaderboardData]) => {
        setNewChallenges(newChallenges);
        setRecentCheckIns(recentCheckins);
        setLeaderboardData(leaderboardData);

        setIsLoading(false);
      });
    }
  }, [mounted]);

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
            label="Discover"
            count={newChallenges.length}
            isActive={activeTab === DashboardDisplay.challenge_discovery}
            onClick={() => setActiveTab(DashboardDisplay.challenge_discovery)}
            icon={
              <Search className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
          <TabButton
            label="My Checkins"
            count={leaderboard.length}
            isActive={activeTab === DashboardDisplay.check_ins}
            onClick={() => setActiveTab(DashboardDisplay.check_ins)}
            icon={
              <BicepsFlexed className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
          <TabButton
            label="Leaderboard"
            count={4}
            isActive={activeTab === DashboardDisplay.leaderboard}
            onClick={() => setActiveTab(DashboardDisplay.leaderboard)}
            icon={
              <Users className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
        </div>
      </div>

      <div
        className={`rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-blue-50/50 dark:bg-slate-800/60 ${
          activeTab === DashboardDisplay.challenge_discovery
            ? "gap-4 sm:gap-6"
            : "gap-1 sm:gap-2"
        }`}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : activeTab === DashboardDisplay.challenge_discovery
          ? newChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                mode={activeTab}
              />
            ))
          : activeTab === DashboardDisplay.check_ins
          ? recentCheckIns
              .slice()
              .reverse()
              .map((checkIn) => (
                <PreviousCheckIns
                  key={checkIn.id}
                  {...checkIn}
                />
              ))
          : activeTab === DashboardDisplay.leaderboard
          ? leaderboard.map((leader: LeaderboardData, index: number) => (
              <Leaderboard
                key={index}
                username={leader.username}
                daysActive={leader.daysActive}
                rank={index + 1}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Dashboard;
