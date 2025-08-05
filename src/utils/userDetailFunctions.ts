import { UserDetails } from "@/types/userDetails";

async function getUserProfile(username: string): Promise<UserDetails> {
  console.log(`Fetching profile for username: ${username}`);

  try {
    // In the future, this would be a single API call to get both user details and stats
    const profile: UserDetails = {
      id: "1", // This would come from your database
      name: "Syscily",
      username: "sys_the_alchemist",
      bio: "Food, Fitness, and ForLoops",
      avatar: "/images/user.png",
      location: "Dallas TX",
      joinDate: "July 2023",
      followers: 150,
      following: 200,
      level: 10,
      stats: {
        totalCheckins: 80,
        totalChallenges: 5,
        totalGains: 375,
      },
    };

    console.log("Profile fetched successfully:", profile);
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export { getUserProfile, type UserDetails };

export function getRecentCheckIns(user: string) {
  console.log("user is: ", user);
  const checkInData = [
    {
      id: "1",
      title: "Standing Ab Marches",
      date: "July 29, 2025",
      number: 1,
    },
    { id: "2", title: "Crunches", date: "August 1, 2015", number: 2 },
    {
      id: "3",
      title: "Planks",
      date: "August 3, 2025",
      number: 3,
    },
  ];

  return checkInData;
}

export function getLeaderboardData() {
  const leaderboardData = [
    { id: "1", username: "Syscily", daysActive: 15 },
    { id: "2", username: "Kiara", daysActive: 12 },
    { id: "3", username: "Daniel", daysActive: 10 },
  ];

  return leaderboardData;
}
