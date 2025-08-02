"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChallengeCardProps } from "@/types/challenge";
import {
  getChallengesInProgress,
  getNewChallenges,
  getPreviousChallenges,
} from "@/utils/challengeFunctions";
import Image from "next/image";

import ChallengeCheckInForm from "@/components/Challenges/ChallengeCheckInForm";

export default function ChallengeDetails() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [challenge, setChallenge] = useState<ChallengeCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCheckInForm, setShowCheckInForm] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const fetchChallenge = async () => {
        const allChallenges = [
          ...(await getChallengesInProgress("dummy-user-id")),
          ...(await getPreviousChallenges("dummy-user-id")),
          ...(await getNewChallenges("dummy-user-id")),
        ];

        const found = allChallenges.find((c) => c.id === params.id);
        setChallenge(found || null);
        setLoading(false);
      };

      fetchChallenge();
    }
  }, [params.id, mounted]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!challenge) {
    return <div className="p-6">Challenge not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-blue-glow border border-blue-900/50 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex  gap-2">
              {challenge.title}
            </h1>
            <button
              onClick={() => setShowCheckInForm(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
            >
              Check In
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Image
              width={40}
              height={40}
              src={challenge.creatorAvatar}
              alt={challenge.creator}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-gray-600 dark:text-gray-300">Created by</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {challenge.creator}
              </p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300">
              {challenge.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Duration</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {challenge.duration} days
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Participants</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {challenge.participants.length} joined
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Start Date</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {new Date(challenge.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">End Date</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {new Date(challenge.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {challenge.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-sm text-gray-600 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              Participants
            </h3>
            <div className="flex flex-wrap gap-2">
              {challenge.participants.map((participant) => (
                <span
                  key={participant}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm text-blue-600 dark:text-blue-300"
                >
                  {participant}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Check-in Form Modal */}
      {showCheckInForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md mx-2 sm:mx-4 rounded-2xl shadow-purple-glow p-3 sm:p-6">
            <ChallengeCheckInForm
              challengeId={challenge.id}
              challengeName={challenge.title}
              onClose={() => setShowCheckInForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
