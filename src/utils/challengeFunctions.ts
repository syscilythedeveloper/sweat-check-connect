/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChallengeData } from "@/types/challenge";

export const fetchChallengeData = async () => {
  const response = await fetch(`/api/challenges`);

  if (!response.ok) {
    throw new Error("Failed to fetch challenge data");
  }

  return response.json();
};

export function createChallenge(data: ChallengeData) {
  console.log("Creating challenge with data:", data);
  return fetch(`/api/challenges/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export const joinChallenge = async (challengeId: string) => {
  const response = await fetch(`/api/challenges/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ challengeId }),
  });

  if (!response.ok) {
    throw new Error("Failed to join challenge");
  }
  return response.json();
};
export const leaveChallenge = async (challengeId: string) => {
  console.log(`Leaving challenge ${challengeId}`);
  return "Challenge left successfully";
};

export function calculateDaysUntilStart(startDate: Date) {
  const today = new Date();
  const diffTime = startDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
export function calculateCurrentDay(startDate: Date, duration: number): number {
  const start = new Date(startDate);
  const today = new Date();
  // Zero out the time for accurate day difference
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 0; // Not started yet
  if (diffDays + 1 > duration) return duration; // Challenge is over
  return diffDays + 1; // 1-based day count
}

export function checkInToChallenge(
  challengeId: string,
  userId: string,
  checkInInfo: any
) {
  if (!challengeId || !userId) return;
  console.log(
    `Checking in to challenge ${challengeId} for user ${userId}`,
    checkInInfo
  );
  return checkInInfo;
}
