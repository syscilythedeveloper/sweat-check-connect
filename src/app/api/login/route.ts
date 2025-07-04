import bcrypt from "bcrypt";

import { prisma } from "../../../../prisma/utils/prisma";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log("Login request data:", { email, password });

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.error("Invalid password attempt for user:", email);
    return Response.json(
      { success: false, error: "Invalid email or password" },
      { status: 401 }
    );
  }

  return Response.json({
    success: true,
    user: { id: user.id, email: user.email },
  });
}
