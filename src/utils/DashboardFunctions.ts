export const fetchDashboardData = async () => {
  const response = await fetch(`/api/dashboard/`);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
};

export const joinChallenge = async (challengeId: string) => {
  const response = await fetch(`/api/challenges/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ challengeId }),
  });

  if (!response.ok) {
    throw new Error("Failed to join challenge");
  }
  return response.json();
};
