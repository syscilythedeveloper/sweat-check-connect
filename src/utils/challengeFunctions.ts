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

export function getChallengesInProgress(userId: string) {
  //filter challenges where the user is a participant and status is "joined"
  if (!userId || userId.length === 0) return [];
  //use user id to filter challenges where the user is a participant and status is "joined"
  //userChallengeData is an array of user challenges
  const joinedChallenges = [
    {
      id: "1",
      title: "Running Streak",
      description:
        "Run at least 5K every day for 30 consecutive days. Build consistency and endurance!",
      duration: 30,
      participants: ["elroy", "smokey", "Ezelle"],
      creator: "RunningClub",
      creatorAvatar: "/images/defaultUser.png",
      tags: ["running", "endurance", "daily"],
      startDate: "2025-07-20",
      endDate: "2025-08-15",
    },
    {
      id: "2",
      title: "Yoga Challenge",
      description:
        "Practice yoga for at least 20 minutes every day for 30 days. Improve flexibility and mindfulness.",
      duration: 15,
      participants: ["Pearlie", "Damon", "Magic Mike", "Dayday"],
      creator: "YogaLovers",
      creatorAvatar: "/images/defaultUser.png",
      tags: ["yoga", "flexibility", "mindfulness"],
      startDate: "2025-08-15",
      endDate: "2025-09-30",
    },
  ];
  return joinedChallenges;
}

export function getPreviousChallenges(userId: string) {
  //retrieve challenges where the user is a participant and has completed it
  if (!userId || userId.length === 0) return [];
  const previousChallenges = [
    {
      id: "5",
      title: "HIIT Warrior Challenge",
      description:
        "Complete 20 high-intensity interval training sessions in 30 days. Boost your fitness and burn fat!",
      duration: 30,
      participants: ["sys1", "sys2", "sys3"],
      creator: "HIITMasters",
      creatorAvatar: "/images/defaultUser.png",
      tags: ["HIIT", "fitness", "fat loss"],
      startDate: "2025-06-25",
      endDate: "2025-07-25",
    },
    {
      id: "6",
      title: "Strength Training Challenge",
      description:
        "Lift weights at least 3 times a week for 6 weeks. Build muscle and strength!",
      duration: 10,
      participants: ["sys4", "sys5", "sys6"],
      creator: "StrengthSquad",
      creatorAvatar: "/images/defaultUser.png",
      tags: ["strength", "muscle", "weightlifting"],
      startDate: "2025-07-15",
      endDate: "2025-07-25",
    },
    {
      id: "7",
      title: "Cycling Challenge",
      description:
        "Cycle at least 100 miles in 30 days. Great for cardio and leg strength!",
      duration: 15,
      participants: ["sys7", "sys8", "sys9"],
      creator: "CyclingCrew",
      creatorAvatar: "/images/defaultUser.png",
      tags: ["cycling", "cardio", "outdoors"],
      startDate: "2025-01-01",
      endDate: "2025-01-16",
    },
  ];
  return previousChallenges;
}

export function getNewChallenges(userId: string) {
  if (!userId || userId.length === 0) return [];
  //use user id to filter challenges where the user is not a participant
  //userChallengeData is an array of user challenges
  const discoverChallenges = [
    {
      id: "2",
      title: "Push-Up Power Challenge",
      description:
        "Build up to 100 consecutive push-ups over 6 weeks. Perfect for upper body strength!",
      duration: 42,
      participants: ["premo", "june", "larry"],
      creator: "StrengthGuild",
      creatorAvatar: "/images/defaultUser.png",
      tags: ["pushups", "strength", "bodyweight"],
      startDate: "2025-08-15",
      endDate: "2025-09-26",
    },
    {
      id: "3",
      title: "30-Day Meditation Challenge",
      description:
        "Meditate for at least 10 minutes every day for 30 days. Cultivate mindfulness and reduce stress.",
      duration: 30,
      participants: ["elroy", "smokey", "Ezelle"],
      creator: "MindfulLiving",
      creatorAvatar: "/images/defaultUser.png",
      tags: ["meditation", "mindfulness", "stress relief"],
      startDate: "2025-08-15",
      endDate: "2025-09-30",
    },
    {
      id: "4",
      title: "30-Day Healthy Eating Challenge",
      description:
        "Eat at least 5 servings of fruits and vegetables every day for 30 days. Improve your nutrition and energy levels!",
      duration: 30,
      participants: ["Pearlie", "Damon", "Magic Mike", "Dayday"],
      creator: "HealthyEaters",
      creatorAvatar: "/images/defaultUser.png",
      tags: ["nutrition", "healthy eating", "wellness"],
      startDate: "2025-08-15",
      endDate: "2025-09-30",
    },
    {
      id: "5",
      title: "HIIT Warrior Challenge",
      description:
        "Complete 20 high-intensity interval training sessions in 30 days. Boost your fitness and burn fat!",
      duration: 30,
      participants: ["sys1", "sys2", "sys3"],
      creator: "HIITMasters",
      creatorAvatar: "/images/defaultUser.png",
      tags: ["HIIT", "fitness", "fat loss"],
      startDate: "2025-08-17",
      endDate: "2025-08-31",
    },
  ];
  return discoverChallenges;
}
