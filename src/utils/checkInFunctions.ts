export function getCheckInsForChallengeTab() {
  const challengeAssociatedCheckIns = [
    {
      id: "checkin1",
      challengeName: "Burpee Challenge",
      videoUrl: "https://www.youtube.com/shorts/ShFYQiKkp4c",
      userId: "user1",
      avatar: "/images/defaultUser.png",
      timestamp: "07/10/2023 14:30:00",
      caption: "Completed my burpees for the day!",
    },
    {
      id: "checkin2",
      challengeName: "Push-Up Challenge",
      videoUrl: "https://www.youtube.com/embed/xYkfexJNtss",
      userId: "user2",
      avatar: "/images/defaultUser.png",
      timestamp: "07/12/2023 14:30:00",
      caption: "Completed my push-ups for the day!",
    },
  ];

  return challengeAssociatedCheckIns;
}

export function getCheckInsForDiscoverTab() {
  const discoverCheckIns = [
    {
      id: "checkin3",
      userId: "user3",
      avatar: "/images/defaultUser.png",
      videoUrl: "https://www.youtube.com/shorts/8b1d9f2c4e5a",
      timestamp: "07/15/2023 14:30:00",
      caption: "Feeling great after this workout!",
    },
    {
      id: "checkin4",
      userId: "user4",
      avatar: "/images/defaultUser.png",
      videoUrl: "https://www.youtube.com/shorts/3c2d1e4f5b6a",
      timestamp: "07/16/2023 14:30:00",
      caption: "Just finished a long run, feeling accomplished!",
    },
  ];

  return discoverCheckIns;
}
