import React, { useState } from "react";
import { ConnectionCardProps, connectionType } from "@/types/connections";
import Image from "next/image";
import { Button } from "../ui/button";

function HoverUnfollowButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <Button
      variant={hovered ? "destructive" : "secondary"}
      className={`rounded-full border border-transparent px-5 py-2 font-bold ${
        hovered
          ? "text-red-300 bg-red-600/50 hover:bg-red-700/50 dark:bg-red-700 dark:hover:bg-red-800/50 shadow-red-glow dark:border-red-950  "
          : "text-gray-900 dark:text-white bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? "Unfollow" : "Following"}
    </Button>
  );
}

const ConnectionCard = ({
  connection,
  connectionStatus,
  userFollows,
}: {
  connection: ConnectionCardProps;
  connectionStatus: connectionType;
  userFollows?: boolean;
}) => {
  return (
    <div className="flex items-center w-full bg-transparent py-4 px-2 border-b border-gray-200 dark:border-slate-700">
      <Image
        width={48}
        height={48}
        src={connection.avatar}
        alt={connection.username}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 dark:text-gray-400 text-sm truncate">
            @{connection.username}
          </span>
        </div>
        <div className="text-gray-800 dark:text-gray-200 text-sm mt-1 truncate">
          {connection.bio}
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">
        {connectionStatus === connectionType.following ? (
          <HoverUnfollowButton />
        ) : connectionStatus === connectionType.followed_by && userFollows ? (
          <HoverUnfollowButton />
        ) : (
          <Button
            variant="secondary"
            className="rounded-full border border-transparent hover:border-blue-600 px-5 py-2 font-bold text-gray-900 dark:text-white bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 shadow-blue-glow"
          >
            Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;
