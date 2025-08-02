export function getCheckInsForChallengeTab() {
  const challengeAssociatedCheckIns = [
    {
      id: "checkin1",
      challengeName: "21 day Ab Challenge",
      videoUrl: "/videos/workoutvid.mov",
      userId: "sys_capone",
      avatar: "/images/sys.png",
      timestamp: "1 hour ago",
      caption: "Completed my 21 day Ab Challenge!",
    },
    {
      id: "checkin2",
      challengeName: "Push-Up Challenge",
      videoUrl: "/videos/pushups.mov",
      userId: "xoxoKiara",
      avatar: "/images/ki.jpeg",
      timestamp: "2 hours ago",
      caption: "Completed my push-ups for the day!",
    },
  ];

  return challengeAssociatedCheckIns;
}

export function getCheckInsForDiscoverTab() {
  const discoverCheckIns = [
    {
      id: "checkin3",
      userId: "sys_the_alchemist",
      avatar: "/images/user2.jpg",
      videoUrl: "/videos/plank.mov",
      timestamp: "6 hours ago",
      caption: "Feeling great after this workout!",
    },
    {
      id: "checkin4",
      userId: "vmack",
      avatar: "/images/victoria.png",
      videoUrl: "/videos/victoria.mov",
      timestamp: "12 hours ago",
      caption: "Upper body day!",
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
