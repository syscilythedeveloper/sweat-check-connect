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

        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-3 sm:mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search challenges..."
              onChange={(e) => console.log(e.target.value)}
              className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 sm:gap-3 text-[6px] font-bold sm:text-lg items-center justify-center">
          <TabButton
            label="All"
            count={combinedCheckIns.length}
            isActive={activeTab === ChallengeDisplay.combined}
            onClick={() => setActiveTab(ChallengeDisplay.combined)}
            icon={
              <BicepsFlexed className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
          <TabButton
            label="Challenges"
            count={challengeBasedCheckIns.length}
            isActive={activeTab === ChallengeDisplay.challenge_based}
            onClick={() => setActiveTab(ChallengeDisplay.challenge_based)}
            icon={
              <Users className="w-2 h-2 text-blue-600 dark:text-blue-400" />
            }
          />
          <TabButton
            label="Solo"
            count={independentCheckIns.length}
            isActive={activeTab === ChallengeDisplay.independent}
            onClick={() => setActiveTab(ChallengeDisplay.independent)}
            icon={<User className="w-2 h-2 text-blue-600 dark:text-blue-400" />}
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
