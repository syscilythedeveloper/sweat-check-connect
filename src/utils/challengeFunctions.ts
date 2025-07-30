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
