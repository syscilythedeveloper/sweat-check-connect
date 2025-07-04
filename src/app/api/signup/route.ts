import bcrypt from "bcrypt";

import { prisma } from "../../../../prisma/utils/prisma";

async function addUser(userData: { email: string; password: string }) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  console.log("create user function called with data:", userData);

  const user = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log("request data:", { email, password });

    const result = await addUser({ email, password });

    return Response.json({
      message: "User created successfully",
      user: { id: result.id, email: result.email },
    });
  } catch (error) {
    console.error("Sign-up error:", error); // Log the full error for debugging

    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to create user",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    console.log("Fetching users with email:", email);
    const user = await prisma.user.findUnique({
      where: {
        email: `${email}`,
      },
    });

    console.log("User found:", user ? "Yes" : "No");

    // Return true if user exists, false if not
    return Response.json({
      exists: user !== null,
      ...(user && { user: { id: user.id, email: user.email } }), // Optionally include basic user info
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
