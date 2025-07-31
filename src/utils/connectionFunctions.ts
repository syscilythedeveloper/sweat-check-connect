//import prisma from "../../prisma/utils/prisma";

export function getFollowers(userId: string) {
  //retrieve followers of the user
  if (!userId || userId.length === 0) return [];
  const followers = [
    {
      id: "5",
      username: "HIIT Warrior",
      bio: "Complete 20 high-intensity interval training sessions in 30 days. Boost your fitness and burn fat!",
      avatar: "/images/defaultUser.png",
    },
    {
      id: "6",
      username: "Strength Training Enthusiast",
      bio: "Lift weights at least 3 times a week for 6 weeks. Build muscle and strength!",
      avatar: "/images/defaultUser.png",
    },
    {
      id: "7",
      username: "Cycling Champion",
      bio: "Cycle at least 100 miles in 30 days. Great for cardio and leg strength!",
      avatar: "/images/defaultUser.png",
    },
  ];
  return followers;
}

export function getFollowing(userId: string) {
  if (!userId || userId.length === 0) return [];
  //retrieve users that the user is following
  const following = [
    {
      id: "1",
      username: "runningDude",
      bio: "Lover of long runs and early mornings",
      avatar: "/images/defaultUser.png",
    },
    {
      id: "2",
      username: "fitnessFanatic",
      bio: "Always pushing my limits, one workout at a time",
      avatar: "/images/defaultUser.png",
    },
    {
      id: "3",
      username: "yogaQueen",
      bio: "Finding balance and peace through yoga",
      avatar: "/images/defaultUser.png",
    },
    {
      id: "4",
      username: "swimMaster",
      bio: "Making waves in the pool and beyond",
      avatar: "/images/defaultUser.png",
    },
  ];
  return following;
}

export function isFollowedBy(userId: string, connectionId: string) {
  console.log(
    "Checking if userId:",
    userId,
    "is followed by connectionId:",
    connectionId
  );
  return true;
}
