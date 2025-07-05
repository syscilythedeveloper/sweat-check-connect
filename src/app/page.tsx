import Link from "next/dist/client/link";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to Sweat Check Connect
      </h1>
      <p className="text-lg mb-8">
        Your hub for fitness challenges, shared playlists, and more!
      </p>
      <Image
        src="/images/workoutpost.jpeg"
        alt="Fitness Logo"
        width={200}
        height={200}
        className="rounded-full"
      />
      <Link
        href="/sign-in"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Get Started
      </Link>
    </div>
  );
}
