"use client";
import React, { useState, useEffect } from "react";

import { NewChallenge } from "@/types/challenge";
import {
  DashboardDisplay,
  LeaderboardData,
  RecentCheckInData,
} from "@/types/userDetails";

import LeaderboardList from "@/components/Dashboard/LeaderboardFeed";

import CheckInFeed from "@/components/Dashboard/CheckInFeed";

import { useUser } from "@clerk/nextjs";
import ChallengeFeed from "@/components/Dashboard/ChallengeFeed";

const Dashboard = () => {
  const { user } = useUser();
  // Add loading state for initial render
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newChallenges, setNewChallenges] = useState<NewChallenge[]>([]);
  const [recentCheckIns, setRecentCheckIns] = useState<RecentCheckInData[]>([]);
  const [leaderboard, setLeaderboardData] = useState<LeaderboardData[]>([]);

  // Clamp index to available check-ins

  const [activeTab, setActiveTab] = useState<DashboardDisplay>(
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

          setRecentCheckIns(data.recentCheckins);
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
    <div className="w-full h-screen flex flex-col ">
      {/* Header */}
      <div className=" bg-white dark:bg-slate-800/10  p-2 sm:p-6">
        {/* TikTok-Style Header & Tabs */}
        <div className="w-full max-w-full mx-auto text h-16 ">
          {/* TikTok-style Tabs */}
          <div className="flex justify-center items-center ">
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
      <div className="flex-1 relative">
        {activeTab === DashboardDisplay.challenge_discovery ? (
          // Challenge Discovery with Search
          <div className="h-full overflow-y-auto">
            <ChallengeFeed
              challenges={newChallenges}
              isLoading={isLoading}
            />
          </div>
        ) : activeTab === DashboardDisplay.check_ins &&
          recentCheckIns.length > 0 ? (
          // Scrollable Check-ins Layout

          <div className="h-full overflow-hidden">
            <CheckInFeed checkIns={recentCheckIns} />
          </div>
        ) : (
          // Leaderboard Layout
          <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-blue-50/50 dark:bg-background gap-4 rounded-xl p-4 min-h-full overflow-y-auto">
              <LeaderboardList
                leaderboard={leaderboard}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
