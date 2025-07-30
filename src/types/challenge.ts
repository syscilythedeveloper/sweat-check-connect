export interface ChallengeData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  creatorId: string;
  tags?: string[];
}

export interface ChallengeCardProps {
  id: string;
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
}
