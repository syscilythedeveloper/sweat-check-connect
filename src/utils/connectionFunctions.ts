//import prisma from "../../prisma/utils/prisma";

export function getFollowers(userId: string) {
  //retrieve followers of the user
  if (!userId || userId.length === 0) return [];
  const followers = [
    {
      id: "5",
      username: "Jalen Hurts",
      bio: "I like to lift weights and throw touchdowns",
      avatar: "/images/defaultUser.png",
      userFollows: true,
    },
    {
      id: "6",
      username: "Pops",
      bio: "Everytime I'm in the kitchen, you in the kitchen. Eating up all the food.",
      avatar: "/images/defaultUser.png",
      userFollows: true,
    },
    {
      id: "7",
      username: "Deebo",
      bio: "My bike.",
      avatar: "/images/defaultUser.png",
      userFollows: false,
    },
    {
      id: "8",
      username: "Money Mike",
      bio: "Don't be sorry. Be Careful",
      avatar: "/images/defaultUser.png",
      userFollows: false,
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

export function getNewConnections(userId: string) {
  //get new connections for the user
  if (!userId || userId.length === 0) return [];
  const newConnections = [
    {
      id: "8",
      username: "Daffy Duck",
      bio: "Quack that azz up and lift weights",
      avatar: "/images/defaultUser.png",
    },
    {
      id: "9",
      username: "Mystikal",
      bio: "I came in with the mic in my hand. Don't make me have to put my foot in yo ass be cool",
      avatar: "/images/defaultUser.png",
    },
    {
      id: "10",
      username: "Lance Armstrong",
      bio: "Cycle at least 100 miles in 30 days. Great for cardio and leg strength!",
      avatar: "/images/defaultUser.png",
    },
    {
      id: "11",
      username: "Boosie",
      bio: "Purple drank and weight lifting",
      avatar: "/images/defaultUser.png",
    },
    {
      id: "12",
      username: "Soulja Boy",
      bio: "I like to crank that and lift weights at the same time",
      avatar: "/images/defaultUser.png",
    },
    {
      id: "13",
      username: "Tyra Banks",
      bio: "Since yall are so obsessed with me, I might as well lift weights",
      avatar: "/images/defaultUser.png",
    },
  ];
  return newConnections;
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
