import bcrypt from "bcrypt";
//import postgres from "postgres";
import { prisma } from "../../../../prisma/utils/prisma";

//const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function createUser(userData: { email: string; password: string }) {
  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // await sql`
  //   CREATE TABLE IF NOT EXISTS users (
  //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     first_name VARCHAR(255),
  //     last_name VARCHAR(255),
  //     email TEXT NOT NULL UNIQUE,
  //     password TEXT NOT NULL,
  //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  //   );
  // `;
  // const hashedPassword = await bcrypt.hash(userData.password, 10);

  // const insertedUser = await sql`
  //   INSERT INTO users (first_name, last_name, email, password)
  //   VALUES ( NULL, NULL, ${userData.email}, ${hashedPassword})
  //   RETURNING id, email, created_at;
  // `;

  // return insertedUser[0]; // Return the first inserted user
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

    const result = await createUser({ email, password });

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
