export const fetchDashboardData = async () => {
  const response = await fetch(`/api/dashboard`);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
};
