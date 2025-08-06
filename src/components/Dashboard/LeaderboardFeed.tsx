import React from "react";
import Leaderboard from "./Leaderboard"; // import your Leaderboard card
import SkeletonCard from "@/components/Challenges/SkeletonCard";
import { LeaderboardData } from "@/types/userDetails";

interface LeaderboardListProps {
  leaderboard: LeaderboardData[];
  isLoading: boolean;
}

const LeaderboardList = ({ leaderboard, isLoading }: LeaderboardListProps) => (
  <div className="h-full w-full  bg-blue-50/50 dark:bg-background   overflow-y-auto">
    <div className="flex flex-col gap-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
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
