export function validatePassword(password: string): string[] {
  const errors: string[] = [];
  if (password.length < 8)
    errors.push("Password must be at least 8 characters long.");
  if (!/[A-Z]/.test(password))
    errors.push("Password must contain at least one uppercase letter.");
  if (!/[a-z]/.test(password))
    errors.push("Password must contain at least one lowercase letter.");
  if (!/[0-9]/.test(password))
    errors.push("Password must contain at least one number.");
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
    errors.push("Password must contain at least one special character.");
  return errors;
}

export function validateNewUser(email: string): Promise<boolean> {
  return fetch(`/api/users?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to check user existence");
      }
      return response.json();
    })
    .then((data) => data.exists);
}
export async function saveUser(
  email: string,
  password: string
): Promise<Response> {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create user");
  }

  return response.json();
}
