import React from "react";
import Image from "next/image";

import { UserCheckIn } from "@/types/profile";

interface ProfileCheckInFeedProps {
  userCheckIns: UserCheckIn[];
}

const ProfileCheckInFeed: React.FC<ProfileCheckInFeedProps> = ({
  userCheckIns,
}) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto p-2">
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {userCheckIns.map((checkIn) => (
              <div
                key={checkIn.id}
                className="relative aspect-[9/16] rounded-md overflow-hidden"
              >
                {/* Thumbnail image */}
                <Image
                  src={checkIn.checkInThumbNail}
                  alt={checkIn.caption}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
                />

                {/* Overlay for date and caption */}
                <div className="absolute top-0 left-0 w-full p-1 bg-gradient-to-b from-black/60 to-transparent text-white text-xs">
                  <p className="font-semibold leading-tight truncate">
                    {checkIn.caption}
                  </p>
                  <p className="text-[10px] opacity-80">
                    {checkIn.checkInDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCheckInFeed;
