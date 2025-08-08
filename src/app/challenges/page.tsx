"use client";
import React, { useState, useEffect } from "react";

//import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import CreateChallengeForm from "@/components/Challenges/CreateChallengeForm";

import { Challenge } from "@/types/challenge";

import { fetchChallengeData } from "@/utils/challengeFunctions";
import { ChallengeType } from "@/types/challenge";
import ChallengeFeed from "@/components/Challenges/ChallengeFeed";

const ChallengesPage = () => {
  const [mounted, setMounted] = useState(false);
  //const { user } = useUser();
  const [activeTab, setActiveTab] = useState<ChallengeType>(
    ChallengeType.DISCOVER
  );

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [newChallenges, setNewChallenges] = useState<Challenge[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);
  const [pastChallenges, setPastChallenges] = useState<Challenge[]>([]);
  const handleChallengeJoined = (joinedChallenge: Challenge) => {
    // Remove from newChallenges
    setNewChallenges((prev) => prev.filter((c) => c.id !== joinedChallenge.id));

    // Add to activeChallenges
    setActiveChallenges((prev) => [...prev, joinedChallenge]);
  };

  const handleChallengeLeft = (leftChallenge: Challenge) => {
    // Remove from activeChallenges
    setActiveChallenges((prev) =>
      prev.filter((c) => c.id !== leftChallenge.id)
    );

    // Add back to newChallenges (so user can rejoin if they want)
    setNewChallenges((prev) => [...prev, leftChallenge]);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setIsLoading(true);
      Promise.all([fetchChallengeData()]).then(([fetchedChallengeData]) => {
        setIsLoading(false);
        console.log(
          "New Challenges: ",
          fetchedChallengeData.newChallenges,
          "Current Challenges: ",
          fetchedChallengeData.currentChallenges,
          "Past Challenges: ",
          fetchedChallengeData.pastChallenges
        );
        setNewChallenges(fetchedChallengeData.newChallenges);
        setActiveChallenges(fetchedChallengeData.currentChallenges);
        setPastChallenges(fetchedChallengeData.pastChallenges);
      });
    }
  }, [mounted]);

  let displayedChallenges: Challenge[] = [];
  let challengeType = activeTab;
  if (activeTab === ChallengeType.DISCOVER) {
    displayedChallenges = newChallenges;
    challengeType = ChallengeType.DISCOVER;
  } else if (activeTab === ChallengeType.JOINED) {
    displayedChallenges = activeChallenges;
    challengeType = ChallengeType.JOINED;
  } else if (activeTab === ChallengeType.PAST) {
    displayedChallenges = pastChallenges;
    challengeType = ChallengeType.PAST;
  }

  if (isLoading || !mounted) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div
      className="flex flex-col h-screen"
      suppressHydrationWarning
    >
      {/* Header */}
      <div className=" bg-white dark:bg-slate-800/10  p-2 sm:p-6">
        {/* TikTok-Style Header & Tabs */}
        <div className="w-full max-w-full mx-auto text h-16 ">
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-100 dark:bg-slate-800/10 hover:bg-blue-200 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center shadow-blue-glow"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* TikTok-style Tabs */}
          <div className="flex justify-center items-center ">
            {[
              {
                label: "New",
                tab: ChallengeType.DISCOVER,
              },
              {
                label: "Active",
                tab: ChallengeType.JOINED,
                count: activeChallenges.length,
              },
              {
                label: "Past",
                tab: ChallengeType.PAST,
                count: pastChallenges.length,
              },
            ].map(({ label, tab, count }) => (
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
                {label} {count ? `(${count})` : ""}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Create Challenge Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800/10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
            <div className=" bg-white dark:bg-slate-800/10 p-4 border-b border-gray-200 dark:border-slate-600 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                Create Challenge
              </h2>
            </div>
            <div className="p-4">
              <CreateChallengeForm setShowCreateForm={setShowCreateForm} />
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <div className="h-full overflow-y-auto ">
          <ChallengeFeed
            challenges={displayedChallenges}
            isLoading={isLoading}
            challengeType={challengeType}
            onChallengeJoined={handleChallengeJoined}
            onChallengeLeft={handleChallengeLeft}
          />
        </div>
      </div>
    </div>
  );
};

// Tab Button Component

export default ChallengesPage;
