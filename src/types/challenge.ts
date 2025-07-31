export interface ChallengeData {
  title: string;
  description: string;
  duration: number;
  startDate: string;
  endDate: string;
  maxParticipants?: number;
  participants: string[];
  creatorId: string;
  tags?: string[];
}
export interface Challenges {
  challenges: ChallengeData[];
}
export interface JoinedChallengeCardProps {
  id: string;
  title: string;
  description: string;
  participants: string[];
  creator: string;
  creatorAvatar: string;
  tags?: string[];
  startDate: string;
  endDate: string;
}

export interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  duration: number;
  participants: string[];

  creator: string;
  creatorAvatar: string;
  tags?: string[];
  startDate: string;
  endDate: string;
}
export interface UserChallengeData {
  challengeId: string;
  userId: string;
  progress: number;
  status: "joined" | "completed";
  joinedDate: string;
  startDate: string;
  endDate: string;
}
export interface UserChallengeCardProps {
  challengeId: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  participants: number;
  isJoined: boolean;
  progress: number;
  creator: string;
  creatorAvatar: string;
  rewards: string[];
  tags: string[];
  startDate: string;
  endDate: string;
  rewardsClaimed: boolean;
}

export interface userChallenges {
  userId: string;
  challenges: UserChallengeData[];
}
