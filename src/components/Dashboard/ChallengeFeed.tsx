import React from "react";
import SkeletonCard from "@/components/Challenges/SkeletonCard";
import NewChallengeCard from "@/components/Dashboard/Challenges";
import { NewChallenge } from "@/types/challenge";

// Accepts challenges and loading state as props
interface ChallengeFeedProps {
  challenges: NewChallenge[];
  isLoading?: boolean;
}

const ChallengeFeed: React.FC<ChallengeFeedProps> = ({
  challenges,
  isLoading,
}) => (
  <div className="rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-blue-50/50 dark:bg-background  sm:gap-2 h-full gap-2">
    {isLoading ? (
      Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
    ) : challenges && challenges.length > 0 ? (
      challenges.map((challenge) => (
        <NewChallengeCard
          key={challenge.id}
          {...challenge}
        />
      ))
    ) : (
      <div className="col-span-full flex items-center justify-center h-40">
        <span className="text-gray-500 dark:text-gray-400">
          No challenges found. Check back soon!
        </span>
      </div>
    )}
  </div>
);

export default ChallengeFeed;
