"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChallengeCardProps } from "../../../types/challenge";
import { fetchChallengeData } from "../../../utils/challengeData";
import { ChallengeTab } from "../../../types/challenge";

import ChallengeCheckInForm from "../../../components/Challenges/ChallengeCheckInForm";
import { Plus } from "lucide-react";

const ChallengeDetails = () => {
  const params = useParams();

  const [mounted, setMounted] = useState(false);
  const [challenge, setChallenge] = useState<ChallengeCardProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [activeTab, setActiveTab] = useState<ChallengeTab>(
    ChallengeTab.CHECKINS
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log("Fetching challenge data for ID:", params.id);
    fetchChallengeData(params.id as string);
  }, [params.id, mounted]);

  // Prevent hydration issues by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && params?.id) {
      setIsLoading(true);

      fetchChallengeData(params.id as string)
        .then((data) => {
          console.log("Fetched dashboard data:", data);

          setChallenge(data.challenge);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [mounted, params?.id]);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!challenge) {
    return <div className="p-6">Challenge not found</div>;
  }

  let displayedThread: "Messages" | "Check Ins" = "Check Ins";

  if (activeTab === ChallengeTab.MESSAGE) {
    displayedThread = "Messages";
  } else if (activeTab === ChallengeTab.CHECKINS) {
    displayedThread = "Check Ins";
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
              onClick={() => setShowCheckInForm(true)}
              className="bg-blue-100 dark:bg-slate-800/10 hover:bg-blue-200 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center shadow-blue-glow"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* TikTok-style Tabs */}
          <div className="flex justify-center items-center ">
            {[
              {
                label: "Check Ins",
                tab: ChallengeTab.CHECKINS,
              },
              {
                label: "Discussion",
                tab: ChallengeTab.MESSAGE,
              },
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
      {showCheckInForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800/10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
            <div className=" bg-white dark:bg-slate-800/10 p-4 border-b border-gray-200 dark:border-slate-600 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                {challenge.title}{" "}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Check In
                </span>
              </h2>
            </div>
            <div className="p-2">
              <ChallengeCheckInForm
                setShowCheckInForm={setShowCheckInForm}
                challengeId={challenge.id}
              />
            </div>
          </div>
        </div>
      )}

      {displayedThread}
    </div>
  );
};

export default ChallengeDetails;
