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

export enum ChallengeMode {
  discover = "discover",
  joined = "joined",
  completed = "completed",
}
