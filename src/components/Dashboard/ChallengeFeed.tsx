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
  <div>
    {/* Sticky search bar */}
    <div className="sticky top-0 z-10 bg-background px-2 py-3">
      <input
        type="text"
        placeholder="Search challenges…"
        className="w-full px-4 py-2 rounded-lg border"
      />
    </div>
    {/* The grid itself */}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 sm:p-4 pb-50">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
      ) : challenges.length > 0 ? (
        challenges.map((challenge) => (
          <NewChallengeCard
            key={challenge.id}
            {...challenge}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-16 text-gray-500">
          No challenges found. Try a different search!
        </div>
      )}
    </div>
  </div>
);

export default ChallengeFeed;
