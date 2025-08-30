export const postCheckIn = async (formData: FormData) => {
  const response = await fetch(`/api/checkin`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to post checkin");
  }

  return response.json();
};
