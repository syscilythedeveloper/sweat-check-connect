"use client";
import React, { useState, useEffect } from "react";
import { TabButton } from "@/components/TabButton";
import {
  getCheckInsForChallengeTab,
  getCheckInsForDiscoverTab,
} from "@/utils/checkInFunctions";
import { BicepsFlexed, Search, User, Users } from "lucide-react";
import { CheckInData, ChallengeDisplay } from "@/types/checkIns";
import CheckInCard from "@/components/CheckIn/CheckInCard";
import SkeletonCard from "@/components/Challenges/SkeletonCard";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [challengeBasedCheckIns, setChallengeBasedCheckIns] = useState<
    CheckInData[]
  >([]);
  const [independentCheckIns, setIndependentCheckIns] = useState<CheckInData[]>(
    []
  );
  const [combinedCheckIns, setCombinedCheckIns] = useState<CheckInData[]>([]);
  const [activeTab, setActiveTab] = useState<ChallengeDisplay>(
    ChallengeDisplay.combined
  );
  const displayedCheckIns =
    activeTab === ChallengeDisplay.challenge_based
      ? challengeBasedCheckIns
      : activeTab === ChallengeDisplay.independent
      ? independentCheckIns
      : combinedCheckIns;

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getCheckInsForChallengeTab(),
      getCheckInsForDiscoverTab(),
    ]).then(([checkInsForChallenge, checkInsForDiscover]) => {
      setChallengeBasedCheckIns(checkInsForChallenge);
      setIndependentCheckIns(checkInsForDiscover);
      setCombinedCheckIns([...checkInsForChallenge, ...checkInsForDiscover]);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-purple-glow p-3 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              📰 Your News Feed
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              See what your friends are up to and stay motivated!
            </p>
          </div>
        </div>
        {/* Search and Tabs */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search friends by name, username, or interests..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>
        {/* Tabs */}
        <div className="flex space-x-2">
          <TabButton
            label="All Check-Ins"
            count={combinedCheckIns.length}
            isActive={activeTab === ChallengeDisplay.combined}
            onClick={() => setActiveTab(ChallengeDisplay.combined)}
            icon={<BicepsFlexed className="w-4 h-4" />}
          />
          <TabButton
            label="Challenge"
            count={challengeBasedCheckIns.length}
            isActive={activeTab === ChallengeDisplay.challenge_based}
            onClick={() => setActiveTab(ChallengeDisplay.challenge_based)}
            icon={<Users className="w-4 h-4" />}
          />
          <TabButton
            label="Independent"
            count={independentCheckIns.length}
            isActive={activeTab === ChallengeDisplay.independent}
            onClick={() => setActiveTab(ChallengeDisplay.independent)}
            icon={<User className="w-4 h-4" />}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : displayedCheckIns.map((checkIn) => (
              <CheckInCard
                key={checkIn.id}
                {...checkIn}
              />
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
