import React, { useState } from "react";
import Image from "next/image";

import { Connection, ProfileDisplayType } from "@/types/profile";
import { Button } from "../ui/button";
import { unfollowUser } from "@/utils/userInteractions";

interface ConnectionsFeedProps {
  connections: Connection[];
  type: ProfileDisplayType;
}

const ConnectionsFeed = ({ connections, type }: ConnectionsFeedProps) => {
  // Track unfollow status per username: 'idle' | 'loading' | 'done'
  const [unfollowStatus, setUnfollowStatus] = useState<{
    [username: string]: "idle" | "loading" | "done";
  }>({});

  const handleUnfollow = async (username: string) => {
    setUnfollowStatus((prev) => ({ ...prev, [username]: "loading" }));
    try {
      await unfollowUser(username);
      setUnfollowStatus((prev) => ({ ...prev, [username]: "done" }));
    } catch (error) {
      setUnfollowStatus((prev) => ({ ...prev, [username]: "idle" }));
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {connections.map((connection) => {
            const status = unfollowStatus[connection.username] || "idle";
            return (
              <div
                key={connection.id}
                className="flex items-center justify-between bg-white dark:bg-slate-900/50 rounded-lg shadow p-4"
              >
                {/* Left side: profile pic + username */}
                <div className="flex items-center">
                  <Image
                    src={connection.avatar}
                    alt={connection.username}
                    width={48}
                    height={48}
                    className="w-10 h-10 rounded-full object-cover mr-3 border-1 border-gray-500"
                  />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    @{connection.username}
                  </span>
                </div>

                {type === ProfileDisplayType.FOLLOWING ? (
                  <Button
                    variant="destructive"
                    onClick={() => handleUnfollow(connection.username)}
                    disabled={status !== "idle"}
                  >
                    {status === "idle" && "Unfollow"}
                    {status === "loading" && "...Unfollowing"}
                    {status === "done" && "Unfollowed"}
                  </Button>
                ) : (
                  <Button variant="ghost">View Profile</Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ConnectionsFeed;
