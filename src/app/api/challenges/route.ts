import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Received challenge data:", body);
  return new Response(
    JSON.stringify({ message: "Challenge created successfully", data: body }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
