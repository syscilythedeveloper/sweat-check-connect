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
import {
  getChallengeMessages,
  updateThreadMessages,
} from "@/utils/challengeCheckInFunctions";
import ChallengeThread from "@/components/Challenges/ChallengeThread";
import { Message } from "@/components/Challenges/ChallengeThread"; // Import the Message interface
import { useUser } from "@clerk/nextjs";

import ChallengeCheckInForm from "@/components/Challenges/ChallengeCheckInForm";

export default function ChallengeDetails() {
  const { user } = useUser();
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [challenge, setChallenge] = useState<ChallengeCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

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

  useEffect(() => {
    if (mounted && challenge) {
      const challengeMessages = getChallengeMessages(challenge.id);
      setMessages(challengeMessages);
    }
  }, [mounted, challenge]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!challenge) {
    return <div className="p-6">Challenge not found</div>;
  }

  const handleSendMessage = (message: string) => {
    // For now, we'll just console.log the message
    console.log("New message:", message);
    if (!user) return;
    const newMessage: Message = {
      id: `${user.id}-${challenge.id}} - ${Date.now()}`,
      username: user.username || user.firstName || "User",
      avatar: user.imageUrl,
      timeAgo: "Just Now",
      message: message,
      likes: 0,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    updateThreadMessages(challenge.id, newMessage);
  };

  return (
    <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-2 space-y-4">
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-blue-glow border-1 border-blue-900/50 p-2 sm:p-6">
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              {challenge.title}
            </h1>
            <button
              onClick={() => setShowCheckInForm(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
            >
              Check In
            </button>
          </div>

          {/* Creator and Tags Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Image
                width={40}
                height={40}
                src={challenge.creatorAvatar}
                alt={challenge.creator}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-xs">
                  Created by
                </p>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">
                  {challenge.creator}
                </p>
              </div>
            </div>

            {challenge.tags && challenge.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  Tags:
                </span>
                {challenge.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-xs text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300">
              {challenge.description}
            </p>
          </div>

          {/* Challenge Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
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

          {/* Participants Section */}
          <div className="flex items-center gap-2 py-2">
            <h3 className="font-semibold text-gray-800 dark:text-white whitespace-nowrap">
              Participants:
            </h3>
            <div className="flex flex-wrap gap-2">
              {challenge.participants.map((participant) => (
                <span
                  key={participant}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs text-blue-600 dark:text-blue-300"
                >
                  {participant}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ChallengeThread
        messages={messages}
        onSendMessage={handleSendMessage}
      />

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
