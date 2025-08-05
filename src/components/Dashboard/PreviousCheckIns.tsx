import { RecentCheckIns } from "@/types/userDetails";

const CheckInCard = ({ title, date, number }: RecentCheckIns) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full max-w-md mx-auto">
    <div className="p-4 flex items-center gap-4">
      {/* Column 1: Large Number */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{number}</span>
        </div>
      </div>

      {/* Column 2: Title and Date */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{date}</p>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
          Check-ins completed
        </p>
      </div>
    </div>
  </div>
);

export default CheckInCard;
