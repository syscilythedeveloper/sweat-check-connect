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
