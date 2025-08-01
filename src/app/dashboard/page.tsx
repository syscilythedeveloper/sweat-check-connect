"use client";
import React, { useState, useEffect } from "react";
import { TabButton } from "@/components/TabButton";
import {
  getCheckInsForChallengeTab,
  getCheckInsForDiscoverTab,
} from "@/utils/checkInFunctions";
import { BicepsFlexed, User, Users } from "lucide-react";
import { CheckInData, ChallengeDisplay } from "@/types/checkIns";
import CheckInCard from "@/components/CheckIn/CheckInCard";
import SkeletonCard from "@/components/Challenges/SkeletonCard";

const Dashboard = () => {
  // Add loading state for initial render
  const [mounted, setMounted] = useState(false);
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

  // Prevent hydration issues by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

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
