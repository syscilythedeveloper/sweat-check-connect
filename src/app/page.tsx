import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Feed from "@/components/Feed";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen">
    //   <h1 className="text-4xl font-bold mb-4 text-center">
    //     Welcome to Sweat Check Connect
    //   </h1>
    //   <p className="text-lg mb-8">
    //     Your hub for fitness challenges, shared playlists, and more!
    //   </p>
    //   <Image
    //     src="/images/workoutpost.jpeg"
    //     alt="Fitness Logo"
    //     width={200}
    //     height={200}
    //     className="rounded-full"
    //   />
    // </div>

    <div className="flex h-screen">
      <Feed />
    </div>
  );
}
