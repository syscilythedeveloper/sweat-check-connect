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
import { fetchDashboardData } from "@/utils/DashboardFunctions";

const Dashboard = () => {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newChallenges, setNewChallenges] = useState<NewChallenge[]>([]);
  const [recentCheckIns, setRecentCheckIns] = useState<RecentCheckInData[]>([]);
  const [leaderboard, setLeaderboardData] = useState<LeaderboardData[]>([]);

  const [activeTab, setActiveTab] = useState<DashboardDisplay>(
    DashboardDisplay.challenge_discovery
  );

  // Prevent hydration issues by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Promise-based dashboard data fetching
  useEffect(() => {
    if (mounted && user?.id) {
      setIsLoading(true);

      fetchDashboardData(user.id)
        .then((data) => {
          console.log("Fetched dashboard data:", data);

          setLeaderboardData(data.leaderboard);
          console.log("Fetched leaderboard data:", data.leaderboard);

          setRecentCheckIns(data.recentCheckins);
          console.log("recent check in data:", data.recentCheckins);

          setNewChallenges(data.newChallenges);
          console.log("Fetched new challenges:", data.newChallenges);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [mounted, user?.id]);

  useEffect(() => {
    const shouldLock =
      activeTab === DashboardDisplay.challenge_discovery ||
      activeTab === DashboardDisplay.leaderboard;

    if (shouldLock) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [activeTab]);
  // reroute to login if user is not authenticated

  // Don't render anything until client-side mount is complete
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen">
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
      <div className="flex-1 min-h-0 relative overflow-hidden">
        {activeTab === DashboardDisplay.challenge_discovery ? (
          // Challenge Discovery with Search
          <div className="h-full overflow-y-auto ">
            <ChallengeFeed
              challenges={newChallenges}
              isLoading={isLoading}
            />
          </div>
        ) : activeTab === DashboardDisplay.check_ins &&
          recentCheckIns.length > 0 ? (
          // Scrollable Check-ins Layout

          <div className="h-full overflow-y-auto pb-20">
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
