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
  return fetch(`/api/signup?email=${encodeURIComponent(email)}`, {
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
  const response = await fetch("/api/signup", {
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
export async function validateLogin(
  email: string,
  password: string
): Promise<{ success: boolean; user?: string; errors?: string[] }> {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      return {
        success: false,
        errors: [data.error || "Invalid email or password"],
      };
    }
    return { success: true, user: data.user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, errors: [error.message] };
    }
    return { success: false, errors: ["An unknown error occurred"] };
  }
}
// export function validateExistingUser(
//   email: string,
//   password: string
// ): Promise<{ success: boolean; errors?: string[] }> {
//   return fetch("/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         return { success: false, errors: ["Invalid email or password"] };
//       }
//       return { success: true };
//     })
//     .catch((error) => ({ success: false, errors: [error.message] }));
// }
