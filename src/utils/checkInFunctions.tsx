export function soloCheckin(userId: string) {
  if (!userId) return;
  console.log(`Solo check-in for user ${userId}`);
  return { userId };
  //make db call to update user check ins.
}

export function challengeCheckIn(challengeId: string, userId: string) {
  if (!challengeId || !userId) return;
  console.log(
    `Challenge check-in for user ${userId} to challenge ${challengeId}`
  );
  return { challengeId, userId };
}

export const postCheckIn = async (formData: FormData) => {
  const response = await fetch(`/api/checkin`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }

  return response.json();
};
