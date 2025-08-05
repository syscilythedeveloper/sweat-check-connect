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
