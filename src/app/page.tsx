import Image from "next/image";

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import CheckInDialog from "@/components/CheckIn/CheckInDialog";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="relative h-[calc(100vh-1rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-workout.png"
            alt="People working out together"
            fill
            className="object-cover"
            priority
            style={{ opacity: 0.6 }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Connect. Sweat.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Grow Together.
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Your fitness journey, powered by community.
          </p>
          <p className="text-lg mb-12 text-gray-300">
            Join challenges, share workouts, and level up your health.
          </p>

          <SignedIn>
            <CheckInDialog
              trigger={
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Check In
                  <ArrowRight className="w-5 h-5" />
                </button>
              }
            />
          </SignedIn>

          <SignedOut>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <SignInButton>
                <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </section>
    </div>
  );
}
