import { RecentCheckIns } from "@/types/userDetails";
import { format, parseISO } from "date-fns";

const PreviousCheckIns = ({
  caption,
  createdAt,
  number,
}: RecentCheckIns & { number: number }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-shadow w-full max-w-md mx-auto mb-2  border border-blue-900/50">
      <div className="flex items-center px-4 py-3 gap-3">
        {/* Number/Countdown */}
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 text-white text-lg font-bold shadow-sm">
          {number}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Date */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {format(parseISO(createdAt), "MMM d, yyyy")}
          </div>
          {/* Caption */}
          <div className="text-base text-gray-900 dark:text-white font-medium leading-snug line-clamp-2">
            {caption}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousCheckIns;
