"use client";
import React from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const Profile = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userProfile, setUserProfile] = useState<UserDetails | null>(null);
  //const user = useUser();

  return (
    <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-2 space-y-4">
      <Card className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-blue-glow  border-1 border-blue-900/50 p-2 sm:p-6">
        <CardContent className="relative p-4">
          <>
            <div className="flex items-center gap-4 justify-center">
              <Image
                src={"/images/defaultUser.png"}
                width={48}
                height={48}
                alt={"syscily"}
                className="rounded-full w-12 h-12 object-cover border shadow-purple-glow"
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <h1 className="text-xs font-semibold text-gray-900 dark:text-gray-400/40">
                  {"sys"}
                </h1>
                <p className="text-sm text-foreground">@{"sys"}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground justify-center">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-blue-400" />
                Joined
              </span>
              <div className="flex gap-4">
                <span>
                  <strong className="text-foreground">23</strong> Followers
                </span>
                <span>
                  <strong className="text-foreground">43</strong> Following
                </span>
              </div>
            </div>

            <p className="mt-2 text-xs font-medium text-gray-900 dark:text-gray-400/40 text-center italic">
              {
                "sys's bio goes here. This is a placeholder text to demonstrate the profile layout."
              }
            </p>
          </>

          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-muted-foreground">No profile data found</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
