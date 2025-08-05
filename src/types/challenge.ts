/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface ChallengeCheckInForm {
  challengeId: string;
}

export enum ChallengeMode {
  discover = "discover",
  joined = "joined",
  past = "past",
}
export interface NewChallenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  duration: number;
  frequencyType: FrequencyType;
  checkInsPerWeek?: number;
  maxParticipants?: number;
  requiredCheckIns: number;
  isPrivate: boolean;
  tags: string[];
  createdBy: any;
  participants: string[];
  createdAt: string;
  updatedAt: string;
  totalCheckins: number;
}
type FrequencyType = "DAILY" | "WEEKLY";
