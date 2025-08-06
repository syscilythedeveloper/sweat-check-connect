import { Flame, TrendingUp, Trophy } from "lucide-react";
import Image from "next/image";

interface LeaderboardProps {
  username: string;
  daysActive: number;
  rank: number;
  avatar: string;
  currentActiveStreak: number;
  longestActiveStreak: number;
}

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        bg: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600",
        border: "border-yellow-400",
        accent: "text-yellow-600",
        shadow: "shadow-yellow-200",
      };
    case 2:
      return {
        bg: "bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500",
        border: "border-slate-400",
        accent: "text-slate-600",
        shadow: "shadow-slate-200",
      };
    case 3:
      return {
        bg: "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600",
        border: "border-orange-400",
        accent: "text-orange-600",
        shadow: "shadow-orange-200",
      };
    default:
      return {
        bg: "bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600",
        border: "border-blue-400",
        accent: "text-blue-600",
        shadow: "shadow-blue-200",
      };
  }
};

const Leaderboard = ({
  username,
  daysActive,
  rank,
  avatar,
  currentActiveStreak,
  longestActiveStreak,
}: LeaderboardProps) => {
  const style = getRankStyle(rank);

  return (
    <div
      className={`relative bg-white dark:bg-slate-800/10  overflow-hidden ${style.shadow} dark:shadow-none border ${style.border} dark:border-transparent hover:scale-[1.02]`}
    >
      {/* Header with rank and user info */}
      <div className="flex items-center p-4 pb-2">
        {/* Rank Badge */}
        <div
          className={`w-12 h-12 rounded-full ${style.bg} flex items-center justify-center mr-4 shadow-lg`}
        >
          <span className="text-lg font-black text-white">#{rank}</span>
        </div>

        {/* Avatar and Username */}
        <div className="flex items-center flex-1">
          <Image
            src={avatar || "/images/defaultUser.png"}
            alt={username}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600/10 mr-3"
          />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">
              {username}
            </h3>
            <div className="flex items-center">
              {rank <= 3 && (
                <Trophy className={`w-4 h-4 mr-1 ${style.accent}`} />
              )}
              <span className={`text-xs font-semibold ${style.accent}`}>
                {rank <= 3 ? "Top Performer" : "Rising Star"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          {/* Total Days Active */}
          <div className="bg-gray-50  dark:bg-slate-700/10 rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-gray-900 dark:text-white">
              {daysActive}
            </div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">
              Total Days
            </div>
          </div>

          {/* Current Streak */}
          <div className="bg-gray-50 dark:bg-slate-700/10 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Flame className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                {currentActiveStreak}
              </span>
            </div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Current
            </div>
          </div>

          {/* Longest Streak */}
          <div className="bg-gray-50 dark:bg-slate-700/10 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                {longestActiveStreak}
              </span>
            </div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Best
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className={`h-1 ${style.bg}`} />
    </div>
  );
};

export default Leaderboard;
