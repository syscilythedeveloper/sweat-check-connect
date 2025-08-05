import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeartPlus, CalendarDays, Users } from "lucide-react";
import { ChallengeCardProps, ChallengeMode } from "@/types/challenge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  calculateGains,
  calculateDaysUntilStart,
  calculateCurrentDay,
} from "@/utils/challengeFunctions";

const tagColorClasses = [
  "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
  "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
  "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
];

// Challenge Card Component
const ChallengeCard = ({
  challenge,
  mode,
}: {
  challenge: ChallengeCardProps;
  mode: ChallengeMode;
}) => {
  const router = useRouter();
  const gains = calculateGains(challenge.duration);
  const currentDay = calculateCurrentDay(
    challenge.startDate,
    challenge.duration
  );

  const handleViewDetails = () => {
    router.push(`/challenges/${challenge.id}`);
  };

  const today = new Date();
  const challengeEnd = new Date(challenge.endDate);
  const challengeStatus =
    today < new Date(challenge.startDate)
      ? "challenge_open"
      : today > challengeEnd
      ? "completed"
      : "challenge_closed";

  return (
    <div className=" flex flex-col h-full bg-accent-foreground rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] shadow-slate-glow">
      {/* Card Header */}
      <div className="flex-1 p-6 pb-4 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="font-bold text-gray-800 dark:text-blue-400 text-sm">
                {mode === ChallengeMode.past && (
                  <span className="text-green-500">
                    {challenge.duration}-Day{" "}
                  </span>
                )}
                {challenge.title}
              </h3>
            </div>

            {/* Stats Row */}
            {mode !== ChallengeMode.past && (
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-1">
                  <span className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-1 text-gray-500 drop-shadow" />
                    {challenge.duration} Days
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="flex items-center">
                    <HeartPlus className="w-5 h-5 mr-1 text-green-500 drop-shadow" />
                    {gains} Gains
                  </span>
                </div>
                {/* Participants */}
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>{challenge.participants.length}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-500">
              <span className="text-gray-500 text-[10px] ">Created By:</span>

              <Image
                width={20}
                height={20}
                src={challenge.creatorAvatar}
                alt={"yay"}
                className="w-3 h-3 rounded-full"
              />
            </div>

            <Separator className="my-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-[1px]" />
            <p className="text-[10px] text-gray-600 dark:text-gray-300 line-clamp-2">
              {challenge.description}
            </p>
          </div>
        </div>

        {challengeStatus === "challenge_open" && (
          <div className="my-6 flex items-center gap-2 justify-center">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Starts in {calculateDaysUntilStart(challenge.startDate)} days
            </div>
          </div>
        )}

        {challengeStatus === "challenge_closed" && (
          <div className="my-4">
            <div className="flex justify-between text-[10px] text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>
                {currentDay}/{challenge.duration} days
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-900 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentDay / challenge.duration) * 100}%` }}
              />
            </div>
          </div>
        )}

        {mode === ChallengeMode.past && (
          <div className="my-8 w-full px-4 py-4 rounded-2xl text-center font-extrabold bg-completed text-green-900 border-2 border-green-500/50 shadow-green-glow shadow-lg text-sm">
            Gains Earned: {gains}
          </div>
        )}

        {/* Tags */}
        {mode !== ChallengeMode.past &&
          challenge.tags &&
          challenge.tags.length > 0 && (
            <div className="flex flex-wrap gap-2  text-[10px] text-gray-900 dark:text-gray-300 justify-center">
              {challenge.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full  ${
                    tagColorClasses[idx % tagColorClasses.length]
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        {mode !== ChallengeMode.past && (
          <div className="mt-2 flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={handleViewDetails}
              className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-100 dark:hover:text-blue-500 hover:underline hover:bg-transparent"
            >
              View Challenge Details
            </Button>
          </div>
        )}
      </div>

      {/* Card Footer */}
      {mode !== "past" && (
        <div className="px-6 py-2 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-600 flex justify-center items-center">
          {mode === ChallengeMode.discover ? (
            <div className="flex items-center gap-6">
              <Button
                variant="outline"
                onClick={() => alert("Join Challenge")}
              >
                Join Challenge
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-6 text-sm">
              <Button
                variant="destructive"
                onClick={() => alert("Leave Challenge")}
              >
                Leave Challenge
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
