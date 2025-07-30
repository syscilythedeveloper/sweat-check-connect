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
