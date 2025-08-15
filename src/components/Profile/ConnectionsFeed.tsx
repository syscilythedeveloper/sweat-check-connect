import React from "react";
import Image from "next/image";

import { Connection, ProfileDisplayType } from "@/types/profile";
import { Button } from "../ui/button";
import { handleUnfollow } from "@/utils/profileFunctions"; // Assuming you have a utility function for unfollow logic

// Define the props for the ConnectionsFeed component

interface ConnectionsFeedProps {
  connections: Connection[];
  type: ProfileDisplayType; // Optional type for future use
}

const ConnectionsFeed: React.FC<ConnectionsFeedProps> = ({
  connections,
  type,
}) => {
  console.log("ConnectionsFeed type:", type);
  console.log("ProfileDisplayType.FOLLOWING:", ProfileDisplayType.FOLLOWING);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {connections.map((connection) => (
            <div
              key={connection.id}
              className="flex items-center justify-between bg-white dark:bg-slate-900/50 rounded-lg shadow p-4"
            >
              {/* Left side: profile pic + username */}
              <div className="flex items-center">
                <Image
                  src={connection.profilePicture}
                  alt={connection.username}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  @{connection.username}
                </span>
              </div>

              {type === ProfileDisplayType.FOLLOWING ? (
                <Button
                  variant="destructive"
                  onClick={() => handleUnfollow(connection.id)}
                >
                  Unfollow
                </Button>
              ) : (
                <Button variant="ghost"> View Profile</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ConnectionsFeed;
