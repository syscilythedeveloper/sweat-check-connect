import { ChallengeData } from "../types/challenge";

export const fetchChallengesData = async () => {
  const response = await fetch(`/api/challenges`);

  if (!response.ok) {
    throw new Error("Failed to fetch challenges data");
  }

  return response.json();
};
export const fetchChallengeData = async (challengeId: string) => {
  const response = await fetch(`/api/challenges/${challengeId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch challenge data");
  }

  return response.json();
};

export const createChallenge = async (data: ChallengeData) => {
  const response = await fetch(`/api/challenges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create challenge");
  }

  return response.json();
};
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
  const response = await fetch(`/api/challenges/join`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ challengeId }),
  });

  if (!response.ok) {
    throw new Error("Failed to leave challenge");
  }
  return response.json();
};
export const deleteChallenge = async (challengeId: string) => {
  const response = await fetch(`/api/challenges`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ challengeId }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete challenge");
  }
  return response.json();
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
