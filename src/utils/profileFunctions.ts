export const fetchProfileData = async () => {
  const response = await fetch(`/api/profile`);
  if (!response.ok) {
    throw new Error("Failed to fetch profile data");
  }
  return response.json();
};

export const handleUnfollow = async (userId: string) => {
  // const response = await fetch(`/api/users`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ userId }),
  // });

  // if (!response.ok) {
  //   throw new Error("Failed to unfollow user");
  // }

  // return response.json();
  console.log(`Unfollowed user with ID: ${userId}`);
  alert("User Unfollowed");
  return { success: true, message: `Unfollowed user with ID: ${userId}` };
};
