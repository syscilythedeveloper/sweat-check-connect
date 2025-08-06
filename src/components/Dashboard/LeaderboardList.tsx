import React from "react";
import Leaderboard from "./Leaderboard"; // import your Leaderboard card
import SkeletonCard from "@/components/Challenges/SkeletonCard";
import { LeaderboardData } from "@/types/userDetails";

interface LeaderboardListProps {
  leaderboard: LeaderboardData[];
  isLoading: boolean;
}

const LeaderboardList = ({ leaderboard, isLoading }: LeaderboardListProps) => (
  <div className="h-full w-full rounded-xl bg-blue-50/50 dark:bg-slate-800/60 px-1 sm:px-4 py-4 overflow-y-auto">
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        : leaderboard.map((leader, index) => (
            <Leaderboard
              key={index}
              username={leader.username}
              daysActive={leader.daysActive}
              avatar={leader.avatar}
              currentActiveStreak={leader.currentActiveStreak}
              longestActiveStreak={leader.longestActiveStreak}
              rank={index + 1}
            />
          ))}
    </div>
  </div>
);

export default LeaderboardList;
