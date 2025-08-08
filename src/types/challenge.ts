/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ChallengeData {
  title: string;
  description: string;
  duration: number;
  startDate: string;
  maxParticipants: number;
  creatorId: string;
  requiredCheckIns: number;
  tags?: string[];
}

export enum ChallengeType {
  DISCOVER = "discover",
  JOINED = "joined",
  CREATED = "created",
}

export enum ChallengeTab {
  MESSAGE = "message",
  CHECKINS = "checkins",
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

export interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  duration: number;
  frequencyType: ChallengeFrequencyType;
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
export type ChallengeFrequencyType = "DAILY" | "WEEKLY";
