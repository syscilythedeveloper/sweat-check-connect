/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import SkeletonCard from "@/components/Challenges/SkeletonCard";
import { NewChallenge } from "@/types/challenge";
import { DashboardDisplay, LeaderboardData } from "@/types/userDetails";

import Leaderboard from "@/components/Dashboard/Leaderboard";

import DashboardCheckInFeed from "@/components/Dashboard/DashBoardCheckInFeed";
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

  // Clamp index to available check-ins

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
    <div className="w-full max-w-full mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-blue-glow  border-1 border-blue-900/50 p-2 sm:p-6">
        {/* TikTok-Style Header & Tabs */}
        <div className="w-full max-w-full mx-auto">
          {/* Minimal Section Title */}
          <div className="pt-2 pb-1 flex items-center justify-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-blue-300 tracking-tight">
              Sweat Checks
            </h1>
          </div>

          {/* TikTok-style Tabs */}
          <div className="flex justify-center items-center border-b border-slate-200 dark:border-slate-700">
            {[
              {
                label: "Find Challenges",
                tab: DashboardDisplay.challenge_discovery,
              },
              { label: "Sweat Checks", tab: DashboardDisplay.check_ins },
              { label: "Leaderboard", tab: DashboardDisplay.leaderboard },
            ].map(({ label, tab }) => (
              <button
                key={label}
                onClick={() => setActiveTab(tab)}
                className={`mx-3 px-0 pb-2 text-base font-semibold transition-all 
          ${
            activeTab === tab
              ? "text-blue-500 dark:text-blue-300 border-b-2 border-blue-500 dark:border-blue-300"
              : "text-slate-400 dark:text-slate-500"
          }
        `}
                style={{ background: "none", outline: "none" }}
              >
                {label}
              </button>
            ))}
          </div>
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
      ) : activeTab === DashboardDisplay.check_ins &&
        recentCheckIns.length > 0 ? (
        // Scrollable Check-ins Layout
        <DashboardCheckInFeed checkIns={recentCheckIns} />
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
