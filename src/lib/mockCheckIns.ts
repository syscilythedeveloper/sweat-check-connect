// Update your CheckIn interface to match your Prisma schema
export interface CheckIn {
  id: string;
  userId: number; // Changed from string to number to match Prisma schema
  user?: {
    // Optional user relation
    id: number;
    name: string | null;
    email: string;
    clerkId: string;
  };

  // Content fields
  caption: string;
  privacy: string; // "public", "friends", "private"

  // Video fields (always video)
  videoUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;

  // Optional metadata
  duration?: number | null;
  thumbnailUrl?: string | null;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Keep your Comment interface as is
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

// Single user data for consistency
const singleUser = {
  id: 1,
  name: "Alex Chen",
  email: "alex.chen@example.com",
  clerkId: "user_2abc123",
};

// Updated mock data - all from the same user (Alex Chen)
export const mockCheckIns: CheckIn[] = [
  {
    id: "checkin_1",
    userId: 1,
    user: singleUser,
    caption:
      "Morning cardio session! 🏃‍♂️ Started my day with a 5K run. Feeling energized and ready to tackle the day!",
    privacy: "public",
    videoUrl: "https://example.com/videos/morning-run.mp4",
    fileName: "morning_run_jan7.mp4",
    fileSize: 12458032,
    mimeType: "video/mp4",
    duration: 23.4,
    thumbnailUrl: "https://example.com/thumbnails/morning-run.jpg",
    createdAt: new Date("2025-01-07T06:30:00Z"),
    updatedAt: new Date("2025-01-07T06:30:00Z"),
  },
  {
    id: "checkin_2",
    userId: 1,
    user: singleUser,
    caption:
      "Deadlift PR! 💪 Just hit 315lbs for the first time. All those months of training finally paid off!",
    privacy: "public",
    videoUrl: "https://example.com/videos/deadlift-pr.mp4",
    fileName: "deadlift_315_pr.MOV",
    fileSize: 8942156,
    mimeType: "video/quicktime",
    duration: 18.7,
    thumbnailUrl: "https://example.com/thumbnails/deadlift-pr.jpg",
    createdAt: new Date("2025-01-06T18:45:00Z"),
    updatedAt: new Date("2025-01-06T18:45:00Z"),
  },
  {
    id: "checkin_3",
    userId: 1,
    user: singleUser,
    caption:
      "Yoga flow to end the weekend 🧘‍♂️ This 20-minute session helped me reset and prepare for the week ahead.",
    privacy: "friends",
    videoUrl: "https://example.com/videos/yoga-flow.mp4",
    fileName: "sunday_yoga_flow.mp4",
    fileSize: 15672890,
    mimeType: "video/mp4",
    duration: 27.1,
    thumbnailUrl: "https://example.com/thumbnails/yoga-flow.jpg",
    createdAt: new Date("2025-01-05T19:15:00Z"),
    updatedAt: new Date("2025-01-05T19:15:00Z"),
  },
  {
    id: "checkin_4",
    userId: 1,
    user: singleUser,
    caption:
      "Boxing training session! 🥊 Working on my combinations and footwork. Coach says I'm getting faster every week!",
    privacy: "public",
    videoUrl: "https://example.com/videos/boxing-training.mp4",
    fileName: "boxing_combo_practice.mp4",
    fileSize: 11234567,
    mimeType: "video/mp4",
    duration: 21.8,
    thumbnailUrl: "https://example.com/thumbnails/boxing-training.jpg",
    createdAt: new Date("2025-01-04T17:30:00Z"),
    updatedAt: new Date("2025-01-04T17:30:00Z"),
  },
  {
    id: "checkin_5",
    userId: 1,
    user: singleUser,
    caption:
      "Leg day complete! 🦵 Squats, lunges, and calf raises. My legs are jelly but I feel accomplished!",
    privacy: "public",
    videoUrl: "https://example.com/videos/leg-day.mp4",
    fileName: "leg_day_workout.MOV",
    fileSize: 9876543,
    mimeType: "video/quicktime",
    duration: 25.3,
    thumbnailUrl: "https://example.com/thumbnails/leg-day.jpg",
    createdAt: new Date("2025-01-03T16:00:00Z"),
    updatedAt: new Date("2025-01-03T16:00:00Z"),
  },
  {
    id: "checkin_6",
    userId: 1,
    user: singleUser,
    caption:
      "Swimming session at the pool! 🏊‍♂️ 1500 meters done. Love how refreshing water workouts are for recovery.",
    privacy: "public",
    videoUrl: "https://example.com/videos/swimming.mp4",
    fileName: "pool_workout_1500m.mp4",
    fileSize: 13456789,
    mimeType: "video/mp4",
    duration: 19.2,
    thumbnailUrl: "https://example.com/thumbnails/swimming.jpg",
    createdAt: new Date("2025-01-02T14:20:00Z"),
    updatedAt: new Date("2025-01-02T14:20:00Z"),
  },
  {
    id: "checkin_7",
    userId: 1,
    user: singleUser,
    caption:
      "HIIT session in the garage! 🏃‍♂️ 20 minutes of pure intensity. Burpees, mountain climbers, and jump squats.",
    privacy: "friends",
    videoUrl: "https://example.com/videos/hiit-garage.mp4",
    fileName: "garage_hiit_workout.mp4",
    fileSize: 10987654,
    mimeType: "video/mp4",
    duration: 22.6,
    thumbnailUrl: "https://example.com/thumbnails/hiit-garage.jpg",
    createdAt: new Date("2025-01-01T12:45:00Z"),
    updatedAt: new Date("2025-01-01T12:45:00Z"),
  },
  {
    id: "checkin_8",
    userId: 1,
    user: singleUser,
    caption:
      "Upper body strength training! 💪 Bench press, pull-ups, and shoulder work. Really focusing on form today.",
    privacy: "public",
    videoUrl: "https://example.com/videos/upper-body.mp4",
    fileName: "upper_body_strength.MOV",
    fileSize: 14567890,
    mimeType: "video/quicktime",
    duration: 28.9,
    thumbnailUrl: "https://example.com/thumbnails/upper-body.jpg",
    createdAt: new Date("2024-12-31T11:30:00Z"),
    updatedAt: new Date("2024-12-31T11:30:00Z"),
  },
  {
    id: "checkin_9",
    userId: 1,
    user: singleUser,
    caption:
      "Core workout complete! 🔥 Planks, Russian twists, and bicycle crunches. My abs are on fire but it feels great!",
    privacy: "public",
    videoUrl: "https://example.com/videos/core-workout.mp4",
    fileName: "core_strength_training.mp4",
    fileSize: 8765432,
    mimeType: "video/mp4",
    duration: 20.4,
    thumbnailUrl: "https://example.com/thumbnails/core-workout.jpg",
    createdAt: new Date("2024-12-30T10:15:00Z"),
    updatedAt: new Date("2024-12-30T10:15:00Z"),
  },
  {
    id: "checkin_10",
    userId: 1,
    user: singleUser,
    caption:
      "Outdoor cycling adventure! 🚴‍♂️ 35 miles through the hills. Nothing beats fresh air and challenging terrain!",
    privacy: "public",
    videoUrl: "https://example.com/videos/cycling.mp4",
    fileName: "hill_cycling_adventure.mp4",
    fileSize: 16789012,
    mimeType: "video/mp4",
    duration: 24.7,
    thumbnailUrl: "https://example.com/thumbnails/cycling.jpg",
    createdAt: new Date("2024-12-29T09:00:00Z"),
    updatedAt: new Date("2024-12-29T09:00:00Z"),
  },
];

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Helper function to format duration
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Helper function to format relative time
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString();
};

// Helper function to get user stats
export const getUserStats = () => {
  return {
    totalWorkouts: mockCheckIns.length,
    thisWeek: mockCheckIns.filter(
      (checkin) =>
        new Date(checkin.createdAt) >=
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length,
    totalDuration: mockCheckIns.reduce(
      (total, checkin) => total + (checkin.duration || 0),
      0
    ),
    favoriteWorkoutType: "Strength Training", // Based on mock data variety
  };
};
