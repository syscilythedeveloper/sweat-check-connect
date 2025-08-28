"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { ProfileDisplayType, UserCheckIn } from "@/types/profile";
import { Separator } from "@/components/ui/separator";
import ProfileCheckInFeed from "@/components/Profile/ProfileCheckInFeed";
import { fetchProfileData } from "@/utils/profileData";
import ConnectionsFeed from "@/components/Profile/ConnectionsFeed";

const GradientDefs = () => {
  // Hidden SVG that defines the gradient used by the ring stroke
  return (
    <svg style={{ height: 0, width: 0, position: "absolute" }}>
      <defs>
        <linearGradient
          id="sccRing"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            stopColor="#8b5cf6"
          />{" "}
          {/* purple */}
          <stop
            offset="100%"
            stopColor="#3b82f6"
          />{" "}
          {/* blue   */}
        </linearGradient>
      </defs>
    </svg>
  );
};

export function ActiveDaysRing({ activeDays = 6 }: { activeDays?: number }) {
  const clamped = Math.max(0, Math.min(activeDays, 100));

  return (
    <div className="relative flex items-center gap-4">
      <GradientDefs />

      <div className="w-10 h-10">
        {" "}
        {/* size of the ring */}
        <CircularProgressbarWithChildren
          value={clamped}
          maxValue={100}
          strokeWidth={12}
          styles={buildStyles({
            // Use the gradient & rounded ends like the mock
            pathColor: "url(#sccRing)",
            trailColor: "rgba(255,255,255,0.08)",
            strokeLinecap: "round",
            pathTransition: "none",
          })}
        >
          {/* Center content */}
          <div className="flex flex-col items-center -mt-1">
            <span className=" text-md text-purple-500 font-bold leading-none">
              {clamped}
            </span>
          </div>
        </CircularProgressbarWithChildren>
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-purple-500 font-semibold text-xs">
          Days Active in 2025
        </span>
        <span className="text-gray-400 text-xs">
          Reach the 100 check-in milestone
        </span>
      </div>
    </div>
  );
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ProfileDisplayType>(
    ProfileDisplayType.CHECKINS
  );
  const [userCheckIns, setUserCheckIns] = useState<UserCheckIn[]>([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const user = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setIsLoading(true);
      Promise.all([fetchProfileData()]).then(([fetchedProfileData]) => {
        setIsLoading(false);
        console.log(
          "User Check-Ins:",
          fetchedProfileData.checkIns,
          "Following: ",
          fetchedProfileData.following,
          "Followers: ",
          fetchedProfileData.followers
        );
        setUserCheckIns(fetchedProfileData.checkIns);
        console.log("User Check-Ins:", fetchedProfileData.checkIns);
        setFollowing(fetchedProfileData.following);
        console.log("Following:", fetchedProfileData.following);
        setFollowers(fetchedProfileData.followers);
        console.log("Followers:", fetchedProfileData.followers);
      });
    }
  }, [mounted]);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <Card className="flex-shrink-0 bg-white rounded-2xl border-1 border-slate-900/50 dark:bg-slate-800/30  p-2 sm:p-6">
        <CardContent className="relative p-4">
          <>
            <div className="flex items-center gap-4 justify-center">
              <Image
                src={user.user?.imageUrl || "/images/user.png"}
                width={48}
                height={48}
                alt={"syscily"}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <h1 className="text-xs font-semibold text-gray-900 dark:text-gray-400/40">
                  {user.user?.fullName || user.user?.firstName || "User"}
                </h1>

                <p className="text-sm text-foreground">
                  @{user.user?.username || "sys"}
                </p>
              </div>
            </div>
            <span className="text-xs  dark:text-gray-400/40"></span>

            <p className="mt-2 mb-2 text-xs font-medium text-gray-900 dark:text-gray-400/40 text-center italic">
              {
                "I'm Sys, the creator of this app. Good luck beating me on the leaderboard!(you won't though)"
              }
            </p>
            <Separator className="my-1 bg-gray-500/10" />

            <ActiveDaysRing activeDays={6} />
            <Separator className="my-1 bg-gray-500/10" />

            <div className="flex justify-center items-center mt-2">
              {[
                {
                  label: "Sweat Checks",
                  tab: ProfileDisplayType.CHECKINS,
                  count: userCheckIns.length,
                },
                {
                  label: "Following",
                  tab: ProfileDisplayType.FOLLOWING,
                  count: following.length,
                },
                {
                  label: "Followers",
                  tab: ProfileDisplayType.FOLLOWERS,
                  count: followers.length,
                },
              ].map(({ label, tab, count }) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(tab)}
                  className={`mx-3 px-0 pb-2 text-xs font-semibold transition-all 
                ${
                  activeTab === tab
                    ? "text-blue-500 dark:text-blue-300 border-b-2 border-blue-500 dark:border-blue-300"
                    : "text-slate-400 dark:text-slate-500"
                }
              `}
                  style={{ background: "none", outline: "none" }}
                >
                  <div className="flex flex-col items-center">
                    {count && (
                      <span className="text-xs font-bold">{count}</span>
                    )}
                    <span>{label}</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        </CardContent>
      </Card>

      <div className="flex-1 overflow-y-auto px-2 sm:px-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <>
            {activeTab === ProfileDisplayType.CHECKINS && (
              <ProfileCheckInFeed userCheckIns={userCheckIns} />
            )}
            {activeTab === ProfileDisplayType.FOLLOWING && (
              <ConnectionsFeed
                connections={following}
                type={ProfileDisplayType.FOLLOWING}
              />
            )}
            {activeTab === ProfileDisplayType.FOLLOWERS && (
              <ConnectionsFeed
                connections={followers}
                type={ProfileDisplayType.FOLLOWERS}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
