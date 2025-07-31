export function getTotalGains(userId: string) {
  // This function would typically fetch the user's workout data and calculate total gains
  // For now, we'll return a mock value
  console.log("Fetching total gains for user:", userId);
  return 150; // Example: total gains in kg or lbs
}

export function recentUserCheckins(userId: string) {
  console.log("Fetching recent check-ins for user:", userId);
  const recentCheckins = [
    {
      date: "2025-07-22",
      workout: "Running",
      caption: "Felt great today!",
      duration: 30,
    },
    {
      date: "2025-07-23",
      workout: "Yoga",
      caption: "Need to improve my flexibility.",
      duration: 45,
    },
    {
      date: "2025-07-24",
      workout: "Weightlifting",
      caption: "Pushed my limits!",
      duration: 60,
    },
    {
      date: "2025-07-25",
      workout: "Cycling",
      caption: "Great ride today!",
      duration: 90,
    },
  ];
  return recentCheckins;
}
