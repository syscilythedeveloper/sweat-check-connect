export interface UserDetails {
  id: string;
  name: string;
  username: string;
  bio?: string;
  avatar: string;
  location?: string;
  joinDate: string;
  followers?: number;
  following?: number;
  level?: number;
  stats?: {
    totalCheckins: number;
    totalChallenges: number;
    totalGains: number;
  };
}

export enum DashboardDisplay {
  globalCheckIns = "check_ins",
  leaderboard = "leaderboard",
  followingCheckIns = "following_check_ins",
}

export type RecentCheckIns = {
  id: string;
  caption: string;
  createdAt: string;
};
export type LeaderboardData = {
  username: string;
  daysActive: number;
  rank: number;
  avatar: string;
  currentActiveStreak: number;
  longestActiveStreak: number;
};

export type RecentCheckInData = {
  caption: string;
  createdAt: string;
  thumnailUrl?: string;
  videoUrl: string;
  user: {
    username: string;
    avatar: string;
  };
};
