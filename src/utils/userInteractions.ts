export const followUser = async (username: string) => {
  const response = await fetch(`/api/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error("Failed to follow user");
  }
  return response.json();
};

export const unfollowUser = async (username: string) => {
  const response = await fetch(`/api/follow`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error("Failed to unfollow user");
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
