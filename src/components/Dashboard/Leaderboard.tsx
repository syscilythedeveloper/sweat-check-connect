import { Medal, Flame } from "lucide-react";

interface LeaderboardProps {
  username: string;
  daysActive: number;
  rank: number;
}

const rankColors = [
  "from-yellow-400 to-yellow-700", // 1st
  "from-gray-400 to-gray-700", // 2nd
  "from-orange-400 to-orange-700", // 3rd
  "from-blue-400 to-blue-700", // everyone else
];

const getRankColor = (rank: number) => rankColors[rank - 1] || rankColors[3];

const Leaderboard = ({ username, daysActive, rank }: LeaderboardProps) => (
  <div className="relative bg-white dark:bg-slate-800/90 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow w-full max-w-md mx-auto border border-gray-100 dark:border-slate-700">
    {/* Side stripe for rank */}
    <div
      className={`absolute left-0 top-0 h-full w-2 bg-gradient-to-b ${getRankColor(
        rank
      )}`}
    />

    <div className="p-5 pl-7 flex items-center gap-4">
      {/* Ranking Badge */}
      <div className="flex-shrink-0">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br ${getRankColor(
            rank
          )}`}
        >
          <span className="text-2xl font-extrabold text-white drop-shadow-lg">
            #{rank}
          </span>
        </div>
      </div>

      {/* User & stats */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
            {username}
          </h3>
          {rank <= 3 && (
            <Medal
              className={`w-5 h-5 ${
                rank === 1
                  ? "text-yellow-400"
                  : rank === 2
                  ? "text-gray-400"
                  : "text-orange-400"
              }`}
            />
          )}
        </div>
        <div className="flex gap-3 mt-2">
          <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <Flame className="w-4 h-4 mr-1" />
            {daysActive} check-ins
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default Leaderboard;
