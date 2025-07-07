import {
  mockCheckIns,
  getMoodEmoji,
  getWorkoutStatusEmoji,
  formatRelativeTime,
} from "@/lib/mockData";

export default function Feed() {
  return (
    <div className="space-y-6">
      {mockCheckIns.map((checkIn) => (
        <div
          key={checkIn.id}
          className="bg-white rounded-lg shadow-md p-6"
        >
          {/* User info */}
          <div className="flex items-center mb-4">
            <img
              src={checkIn.userAvatar || "/default-avatar.png"}
              alt={checkIn.userName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold">{checkIn.userName}</h3>
              <p className="text-sm text-gray-500">
                {formatRelativeTime(checkIn.createdAt)}
              </p>
            </div>
          </div>

          {/* Status and mood */}
          <div className="flex gap-2 mb-3">
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {getWorkoutStatusEmoji(checkIn.workoutStatus)}{" "}
              {checkIn.workoutStatus}
            </span>
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
              {getMoodEmoji(checkIn.mood)} {checkIn.mood}
            </span>
          </div>

          {/* Caption */}
          <p className="mb-4">{checkIn.caption}</p>

          {/* Media */}
          {checkIn.mediaUrl && (
            <img
              src={checkIn.mediaUrl}
              alt="Workout"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}

          {/* Likes and comments */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>❤️ {checkIn.likes} likes</span>
            <span>💬 {checkIn.comments.length} comments</span>
          </div>
        </div>
      ))}
    </div>
  );
}
