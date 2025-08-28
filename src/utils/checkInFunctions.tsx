export function soloCheckin(userId: string) {
  if (!userId) return;
  console.log(`Solo check-in for user ${userId}`);
  return { userId };
}

export function challengeCheckIn(challengeId: string, userId: string) {
  if (!challengeId || !userId) return;
  console.log(
    `Challenge check-in for user ${userId} to challenge ${challengeId}`
  );
  return { challengeId, userId };
}
