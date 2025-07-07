import { auth } from "@clerk/nextjs/server";
import prisma from "../../../prisma/utils/prisma";
import PostInputs from "@/components/PostInputs";
import { redirect } from "next/navigation";

export default async function Profile() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const posts = await prisma.post.findMany({
    where: { author: { clerkId: userId } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto p-4">
      <PostInputs />
      <div className="mt-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border border-zinc-800 rounded mt-4"
          >
            <h2 className="font-bold">{post.title}</h2>
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
