import React from "react";
import { Flame, CalendarCheck } from "lucide-react";

const QuickStats = ({ streak = 5, weeklyProgress = 3, weeklyGoal = 7 }) => {
  const progressPercent = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

  return (
    <div className="bg-gray-100 dark:bg-slate-800 rounded-xl shadow-[0_0_6px_1px_rgba(168,85,247,0.4)] p-3 flex flex-col gap-2 border border-gray-100 dark:border-transparent w-full max-w-xs">
      <div className="flex items-center gap-2">
        <Flame className="text-orange-500 w-4 h-4" />
        <span className="text-base font-bold text-gray-900 dark:text-white">
          {streak} Day Streak
        </span>
      </div>
      <div className="flex items-center gap-2">
        <CalendarCheck className="text-purple-500 w-4 h-4" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Weekly
        </span>
        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          {weeklyProgress}/{weeklyGoal}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default QuickStats;
