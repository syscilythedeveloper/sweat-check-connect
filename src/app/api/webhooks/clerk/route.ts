import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import prisma from "../../../../../prisma/utils/prisma";

export async function POST(req: Request) {
  try {
    console.log("Webhook received");

    const secret = process.env.SIGNING_SECRET;
    if (!secret) {
      console.error("Missing SIGNING_SECRET");
      return new Response("Missing secret", { status: 500 });
    }

    const wh = new Webhook(secret);
    const body = await req.text();
    const headerPayload = await headers();

    console.log("Verifying webhook...");

    const event = wh.verify(body, {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get("svix-timestamp")!,
      "svix-signature": headerPayload.get("svix-signature")!,
    }) as WebhookEvent;

    console.log("Webhook verified, event type:", event.type);

    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = event.data;

      console.log("Creating user with clerkId:", id);

      await prisma.user.upsert({
        where: { clerkId: id },
        update: {},
        create: {
          clerkId: id,
          email: email_addresses[0].email_address,
          name: `${first_name} ${last_name}`,
        },
      });

      console.log("User created successfully");
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
}

export async function GET() {
  return new Response("Webhook endpoint is working", { status: 200 });
}
