import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function createUser(userData: { email: string; password: string }) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  console.log("Hashed Password:", hashedPassword);
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedUser = await sql`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ( NULL, NULL, ${userData.email}, ${hashedPassword})
    RETURNING id, email, created_at;
  `;

  return insertedUser[0];
}

export async function POST(request: Request) {
  try {
    const dateJoined = new Date().toLocaleDateString();
    const { email, password } = await request.json();
    console.log("request data:", { email, password, dateJoined });
    // const result = await sql.begin((sql) => [createUser(), console.log(sql)]);

    const result = await createUser({ email, password });

    return Response.json({
      message: "User created successfully",
      user: { id: result.id, email: result.email },
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
