"use client";
import React, { useState, useEffect } from "react";

import {
  DashboardDisplay,
  LeaderboardData,
  RecentCheckInData,
} from "@/types/userDetails";

import LeaderboardList from "@/components/Dashboard/LeaderboardFeed";

import CheckInFeed from "@/components/Dashboard/CheckInFeed";

import { useUser } from "@clerk/nextjs";

import { fetchDashboardData } from "@/utils/dashboardData";

const Home = () => {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [globalCheckIns, setGlobalCheckIns] = useState<RecentCheckInData[]>([]);
  const [leaderboard, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [followingCheckIns, setFollowingCheckIns] = useState<
    RecentCheckInData[]
  >([]);

  const [activeTab, setActiveTab] = useState<DashboardDisplay>(
    DashboardDisplay.followingCheckIns
  );

  // Prevent hydration issues by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Promise-based dashboard data fetching
  useEffect(() => {
    if (mounted && user?.id) {
      setIsLoading(true);

      fetchDashboardData()
        .then((data) => {
          console.log("Fetched dashboard data:", data);

          setLeaderboardData(data.leaderboard);
          setFollowingCheckIns(data.followingCheckIns);
          setGlobalCheckIns(data.globalCheckIns);
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
      activeTab === DashboardDisplay.followingCheckIns ||
      activeTab === DashboardDisplay.leaderboard;

    if (shouldLock) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [activeTab]);

  if (!mounted) return null;

  // Handler to update follow status in check-in arrays
  const handleStatusChange = (username: string, status: string) => {
    setGlobalCheckIns((prev) =>
      prev.map((checkIn) =>
        checkIn.user.username === username
          ? {
              ...checkIn,
              user: {
                ...checkIn.user,
                followers: [{ status }],
              },
            }
          : checkIn
      )
    );
    setFollowingCheckIns((prev) =>
      prev.map((checkIn) =>
        checkIn.user.username === username
          ? {
              ...checkIn,
              user: {
                ...checkIn.user,
                followers: [{ status }],
              },
            }
          : checkIn
      )
    );
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className=" bg-white dark:bg-slate-800/10  p-2 sm:p-6">
        {/* TikTok-Style Header & Tabs */}
        <div className="w-full max-w-full mx-auto text ">
          {/* TikTok-style Tabs */}
          <div className="flex justify-center items-center ">
            {[
              { label: "SweatChecks", tab: DashboardDisplay.globalCheckIns },
              {
                label: "Following",
                tab: DashboardDisplay.followingCheckIns,
              },

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
        {activeTab === DashboardDisplay.followingCheckIns ? (
          followingCheckIns.length > 0 ? (
            <div className="h-full overflow-y-auto ">
              <CheckInFeed
                checkIns={followingCheckIns}
                onStatusChange={handleStatusChange}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-lg text-gray-500">
                You aren&apos;t following anyone!
              </span>
            </div>
          )
        ) : activeTab === DashboardDisplay.globalCheckIns &&
          globalCheckIns.length > 0 ? (
          <div className="h-full overflow-y-auto">
            <CheckInFeed
              checkIns={globalCheckIns}
              onStatusChange={handleStatusChange}
            />
          </div>
        ) : (
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

export default Home;
