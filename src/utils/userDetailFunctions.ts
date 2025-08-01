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
