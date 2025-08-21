export const fetchProfileData = async () => {
  const response = await fetch(`/api/profile`);
  if (!response.ok) {
    throw new Error("Failed to fetch profile data");
  }
  return response.json();
};
