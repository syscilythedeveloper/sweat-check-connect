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
  check_ins = "check_ins",
  leaderboard = "leaderboard",
  challenge_discovery = "challenge_discovery",
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
