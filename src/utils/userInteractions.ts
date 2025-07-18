export function followUser(username: string) {
  return fetch(`/api/recommendations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
}
