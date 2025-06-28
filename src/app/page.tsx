import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to Sweat Check Connect
      </h1>
      <p className="text-lg mb-8">
        Your hub for fitness challenges, shared playlists, and more!
      </p>
      <Image
        src="/images/fitness-logo.png"
        alt="Fitness Logo"
        width={200}
        height={200}
        className="rounded-full"
      />
    </div>
  );
}
