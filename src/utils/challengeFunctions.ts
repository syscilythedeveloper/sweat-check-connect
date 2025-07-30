import { ChallengeData } from "@/types/challenge";
//import prisma from "../../prisma/utils/prisma";

export function createChallenge(data: ChallengeData) {
  return fetch(`/api/challenges/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function calculateGains(duration: number) {
  return 10 * duration + duration;
}

export function calculateDaysUntilStart(startDate: string) {
  const start = new Date(startDate);
  const today = new Date();
  const diffTime = start.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
export function calculateCurrentDay(
  startDate: string,
  duration: number
): number {
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
