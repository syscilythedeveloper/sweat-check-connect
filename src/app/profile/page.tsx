"use client";
import React, { useEffect, useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getUserProfile } from "@/utils/DashboardFunctions";
import { UserDetails } from "@/types/userDetails";
//import { useUser } from "@clerk/nextjs";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserDetails | null>(null);
  //const user = useUser();
  const userId = "defaultUser";

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getUserProfile(userId)]).then(([userDetails]) => {
      setUserProfile(userDetails);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-2 space-y-4">
      <Card className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-blue-glow  border-1 border-blue-900/50 p-2 sm:p-6">
        <CardContent className="relative p-4">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-pulse text-muted-foreground">
                Loading...
              </div>
            </div>
          ) : userProfile ? (
            <>
              <div className="flex items-center gap-4 justify-center">
                <Image
                  src={userProfile.avatar}
                  width={48}
                  height={48}
                  alt={userProfile.name}
                  className="rounded-full w-12 h-12 object-cover border shadow-purple-glow"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <h1 className="text-xs font-semibold text-gray-900 dark:text-gray-400/40">
                    {userProfile.name}
                  </h1>
                  <p className="text-sm text-foreground">
                    @{userProfile.username}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground justify-center">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-blue-400" />
                  {userProfile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-blue-400" />
                  Joined {userProfile.joinDate}
                </span>
                <div className="flex gap-4">
                  <span>
                    <strong className="text-foreground">
                      {userProfile.followers}
                    </strong>{" "}
                    Followers
                  </span>
                  <span>
                    <strong className="text-foreground">
                      {userProfile.following}
                    </strong>{" "}
                    Following
                  </span>
                  <span>
                    <strong className="text-primary">
                      Level {userProfile.level}
                    </strong>
                  </span>
                </div>
              </div>

              <p className="mt-2 text-xs font-medium text-gray-900 dark:text-gray-400/40 text-center italic">
                {userProfile.bio}
              </p>
            </>
          ) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="text-muted-foreground">No profile data found</div>
            </div>
          )}
        </CardContent>
      </Card>
      {!isLoading && userProfile && userProfile.stats && (
        <div className="flex flex-wrap justify-center gap-8 mt-8 p-4 rounded-xl bg-white/5 dark:bg-slate-800/80 shadow-slate-glow">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {userProfile.stats.totalCheckins}
            </p>
            <p className="text-xs text-muted-foreground">Check-ins</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {userProfile.stats.totalChallenges}
            </p>
            <p className="text-xs text-muted-foreground">Challenges</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {userProfile.stats.totalGains}
            </p>
            <p className="text-xs text-muted-foreground">Total Gains</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
