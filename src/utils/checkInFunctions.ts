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
      videoUrl: "https://www.youtube.com/shorts/8fQ3BQRyuQ0",
      timestamp: "07/16/2023 14:30:00",
      caption: "Just finished a long run, feeling accomplished!",
    },
  ];

  return discoverCheckIns;
}

export function getTotalCheckins(userId: string) {
  // This function would typically fetch the user's check-in data and calculate total check-ins
  // For now, we'll return a mock value
  console.log("Fetching total check-ins for user:", userId);
  return 75; // Example: total check-ins
}

export function recentCheckins(userId: string) {
  // This function would typically fetch the user's recent check-in data
  // For now, we'll return a mock array of check-ins
  console.log("Fetching recent check-ins for user:", userId);
  return [
    {
      date: "2023-10-01",
      workout: "Running",
      caption: "Felt great today!",
      duration: 30,
    },
    {
      date: "2023-10-02",
      workout: "Yoga",
      caption: "Need to improve my flexibility.",
      duration: 45,
    },
    {
      date: "2023-10-03",
      workout: "Weightlifting",
      caption: "Pushed my limits!",
      duration: 60,
    },
  ];
}
