export type CheckInData = {
  id: string;
  userId: string;
  avatar: string;
  videoUrl: string;
  timestamp: string;
  location?: string;
  caption: string;
  challengeName?: string;
  challengeId?: string;
};

export type CheckInResponse = {
  success: boolean;
};

export interface CheckInCardProps {
  id: string;
  userId: string;
  avatar: string;
  location?: string;
  timestamp: string;
  caption?: string;
  videoUrl: string;
  challengeName?: string;
  challengeId?: string;
}

export enum ChallengeDisplay {
  challenge_based = "challenge_based",
  independent = "independent",
  combined = "combined",
}
export interface DashboardCheckInCard {
  id: string;
  userid: string;
  caption: string;
  videoUrl: string;
  createdAt: string;
  username: string;
}
