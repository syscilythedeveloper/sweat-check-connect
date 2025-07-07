export interface CheckIn {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  mood: string;
  workoutStatus: string;
  caption: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  createdAt: Date;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

export const mockCheckIns: CheckIn[] = [
  {
    id: "1",
    userId: "user_1",
    userName: "Alex Chen",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    mood: "energized",
    workoutStatus: "completed",
    caption:
      "Just crushed my morning workout! 💪 Started with a 5-mile run through the park, followed by some strength training. Feeling absolutely amazing and ready to take on the day!",
    mediaUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    mediaType: "image",
    createdAt: new Date("2025-01-07T08:30:00Z"),
    likes: 24,
    comments: [
      {
        id: "c1",
        userId: "user_2",
        userName: "Sarah Johnson",
        userAvatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b75c?w=150&h=150&fit=crop&crop=face",
        content: "Way to go! Your consistency is inspiring! 🔥",
        createdAt: new Date("2025-01-07T08:45:00Z"),
      },
      {
        id: "c2",
        userId: "user_3",
        userName: "Mike Torres",
        content:
          "Beast mode activated! What's your favorite post-workout snack?",
        createdAt: new Date("2025-01-07T09:15:00Z"),
      },
    ],
  },
  {
    id: "2",
    userId: "user_2",
    userName: "Sarah Johnson",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b75c?w=150&h=150&fit=crop&crop=face",
    mood: "accomplished",
    workoutStatus: "completed",
    caption:
      "New deadlift PR today! 185lbs × 5 reps 🏋️‍♀️ Six months ago I could barely lift the bar. Progress isn't always linear, but showing up consistently makes all the difference.",
    mediaUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    mediaType: "image",
    createdAt: new Date("2025-01-07T07:15:00Z"),
    likes: 42,
    comments: [
      {
        id: "c3",
        userId: "user_1",
        userName: "Alex Chen",
        content: "Incredible progress! That's a huge milestone 💪",
        createdAt: new Date("2025-01-07T07:30:00Z"),
      },
    ],
  },
  {
    id: "3",
    userId: "user_3",
    userName: "Mike Torres",
    userAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    mood: "motivated",
    workoutStatus: "in-progress",
    caption:
      "Rest day doesn't mean lazy day! Taking my dog for a long hike in the mountains. Sometimes the best workouts don't happen in the gym 🐕⛰️",
    mediaUrl:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
    mediaType: "image",
    createdAt: new Date("2025-01-07T06:00:00Z"),
    likes: 18,
    comments: [],
  },
  {
    id: "4",
    userId: "user_4",
    userName: "Emma Rodriguez",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    mood: "tired",
    workoutStatus: "completed",
    caption:
      "Yoga flow complete ✨ Today was all about listening to my body and moving with intention. Not every workout needs to be intense - sometimes we need gentle movement and mindfulness.",
    mediaUrl:
      "https://images.unsplash.com/photo-1506629905061-6d4ffc0d24de?w=600&h=400&fit=crop",
    mediaType: "image",
    createdAt: new Date("2025-01-06T19:30:00Z"),
    likes: 31,
    comments: [
      {
        id: "c4",
        userId: "user_5",
        userName: "David Kim",
        content:
          "Love this mindset! Recovery is just as important as the workout itself 🧘‍♀️",
        createdAt: new Date("2025-01-06T20:00:00Z"),
      },
    ],
  },
  {
    id: "5",
    userId: "user_5",
    userName: "David Kim",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    mood: "energized",
    workoutStatus: "completed",
    caption:
      "Swimming session done! 🏊‍♂️ 2000 meters in the pool this morning. There's something so meditative about the rhythm of stroke, breathe, stroke, breathe. Plus my shoulders are feeling amazing!",
    createdAt: new Date("2025-01-06T17:45:00Z"),
    likes: 15,
    comments: [
      {
        id: "c5",
        userId: "user_2",
        userName: "Sarah Johnson",
        content: "Swimming is such an underrated full-body workout! 🏊‍♂️",
        createdAt: new Date("2025-01-06T18:00:00Z"),
      },
    ],
  },
  {
    id: "6",
    userId: "user_6",
    userName: "Jessica Wong",
    userAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    mood: "accomplished",
    workoutStatus: "planned",
    caption:
      "Boxing class tonight! 🥊 Been training for 3 months now and finally feel like I'm getting the hang of the combinations. Tonight we're working on defense - can't wait to learn some new moves!",
    mediaUrl:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop",
    mediaType: "image",
    createdAt: new Date("2025-01-06T15:20:00Z"),
    likes: 27,
    comments: [],
  },
  {
    id: "7",
    userId: "user_7",
    userName: "Ryan Martinez",
    userAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    mood: "sore",
    workoutStatus: "rest-day",
    caption:
      "Legs are absolutely destroyed from yesterday's squat session 😅 Taking today to stretch, foam roll, and maybe a gentle walk. Sometimes the soreness is the best reminder that you pushed yourself!",
    createdAt: new Date("2025-01-06T12:10:00Z"),
    likes: 22,
    comments: [
      {
        id: "c6",
        userId: "user_1",
        userName: "Alex Chen",
        content: "The struggle is real! Foam rolling is a game changer 💪",
        createdAt: new Date("2025-01-06T12:30:00Z"),
      },
    ],
  },
  {
    id: "8",
    userId: "user_8",
    userName: "Lisa Thompson",
    userAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    mood: "relaxed",
    workoutStatus: "completed",
    caption:
      "Morning bike ride along the coast 🚴‍♀️ 25 miles of pure bliss! The sunrise over the ocean was absolutely breathtaking. Days like this remind me why I fell in love with cycling.",
    mediaUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    mediaType: "image",
    createdAt: new Date("2025-01-06T09:45:00Z"),
    likes: 35,
    comments: [
      {
        id: "c7",
        userId: "user_4",
        userName: "Emma Rodriguez",
        content:
          "This sounds absolutely perfect! Nothing beats a sunrise ride 🌅",
        createdAt: new Date("2025-01-06T10:15:00Z"),
      },
    ],
  },
];

// Helper function to get mood emoji
export const getMoodEmoji = (mood: string): string => {
  const moodEmojis = {
    energized: "⚡",
    motivated: "💪",
    accomplished: "🏆",
    tired: "😴",
    sore: "🤕",
    relaxed: "😌",
  };
  return moodEmojis[mood as keyof typeof moodEmojis] || "😊";
};

// Helper function to get workout status emoji
export const getWorkoutStatusEmoji = (status: string): string => {
  const statusEmojis = {
    completed: "✅",
    "in-progress": "🏃",
    planned: "📅",
    "rest-day": "🛌",
    skipped: "❌",
  };
  return statusEmojis[status as keyof typeof statusEmojis] || "📝";
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
