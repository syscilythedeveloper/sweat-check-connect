"use client";
import React, { useState, useEffect } from "react";

//import { useUser } from "@clerk/nextjs";
import { Plus, Search, CheckCircle, BicepsFlexed } from "lucide-react";
import CreateChallengeForm from "@/components/Challenges/CreateChallengeForm";
import ChallengeCard from "@/components/Challenges/ChallengeCard";
import SkeletonCard from "@/components/Challenges/SkeletonCard";
import { TabButton } from "@/components/TabButton";

import {
  getChallengesInProgress,
  getNewChallenges,
  getPreviousChallenges,
} from "@/utils/challengeFunctions";
import { ChallengeCardProps, ChallengeMode } from "@/types/challenge";

const ChallengesPage = () => {
  const [mounted, setMounted] = useState(false);
  //const { user } = useUser();
  const [activeTab, setActiveTab] = useState<ChallengeMode>(
    ChallengeMode.discover
  );

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [challengesInProgress, setChallengesInProgress] = useState<
    ChallengeCardProps[]
  >([]);
  const [previousChallenges, setPreviousChallenges] = useState<
    ChallengeCardProps[]
  >([]);
  const [newChallenges, setNewChallenges] = useState<ChallengeCardProps[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setIsLoading(true);
      Promise.all([
        getChallengesInProgress("someUserId"),
        getPreviousChallenges("someUserId"),
        getNewChallenges("someUserId"),
      ]).then(([inProgress, previous, newChals]) => {
        setChallengesInProgress(inProgress);
        setPreviousChallenges(previous);
        setNewChallenges(newChals);
        setIsLoading(false);
      });
    }
  }, [mounted]);

  let displayedChallenges: ChallengeCardProps[] = [];
  if (activeTab === ChallengeMode.discover) {
    displayedChallenges = newChallenges;
  } else if (activeTab === ChallengeMode.joined) {
    displayedChallenges = challengesInProgress;
  } else if (activeTab === ChallengeMode.past) {
    displayedChallenges = previousChallenges;
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-2 space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-blue-glow  border-1 border-blue-900/50 p-2 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex  gap-2">
              🏆 Challenges
            </h1>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-5 h-5 " />
              Create
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-3 sm:mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search for challenges by creator, keywords or duration."
              onChange={(e) => console.log(e.target.value)}
              className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 sm:gap-3 text-[6px] font-bold sm:text-lg items-center justify-center">
          <TabButton
            label="New"
            count={newChallenges.length}
            isActive={activeTab === "discover"}
            onClick={() => setActiveTab(ChallengeMode.discover)}
            icon={<Search className="w-2 h-2" />}
          />
          <TabButton
            label="Active"
            count={challengesInProgress.length}
            isActive={activeTab === "joined"}
            onClick={() => setActiveTab(ChallengeMode.joined)}
            icon={<BicepsFlexed className="w-2 h-2" />}
          />
          <TabButton
            label="Past"
            count={previousChallenges.length}
            isActive={activeTab === "past"}
            onClick={() => setActiveTab(ChallengeMode.past)}
            icon={<CheckCircle className="w-2 h-2" />}
          />
        </div>
      </div>

      {/* Create Challenge Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md mx-2 sm:mx-4 rounded-2xl shadow-purple-glow p-3 sm:p-6 ">
            <div className="flex items-center justify-between mb-4 ">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Create Challenge
              </h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <CreateChallengeForm setShowCreateForm={setShowCreateForm} />
          </div>
        </div>
      )}

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : displayedChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                mode={activeTab}
              />
            ))}
      </div>

      {/* Empty State */}
      {displayedChallenges.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            No challenges found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or category filter
          </p>
        </div>
      )}
    </div>
  );
};

// Tab Button Component

export default ChallengesPage;
