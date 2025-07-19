// ConnectionCard.tsx - For displaying other users
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { followUser } from "@/utils/userInteractions";

interface ConnectionCardProps {
  user: {
    id: string;
    username: string;
    avatar: string;
    bio?: string;
  };
  type: "recommendation" | "friend";
}

const ConnectionCard = ({ user, type }: ConnectionCardProps) => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const handleFollow = async () => {
    const res = await followUser(user.username);
    if (res.ok) {
      setIsFollowing(true);
    }
  };
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-transform transform hover:scale-[1.01]">
      <div className="flex items-center space-x-3 mb-3">
        <Image
          src={user.avatar || "/images/defaultUser.png"}
          alt={`${user.username}'s avatar`}
          width={40}
          height={40}
          className="rounded-full object-cover w-[40px] h-[40px] border border-gray-300 dark:border-gray-600"
        />
        <div className="flex-1">
          <Link href={`/profile/${user.username}`}>
            <h3 className="font-semibold text-gray-800 dark:text-white text-sm hover:text-purple-500 transition-colors duration-200">
              @{user.username}
            </h3>
          </Link>
          {user.bio && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-3">
        {type === "recommendation" && (
          <Button
            variant="outline"
            className="w-full text-sm py-2 border border-purple-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
            onClick={handleFollow}
            disabled={isFollowing}
          >
            {!isFollowing && <UserPlus />}
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
        {type === "friend" && (
          <Button
            variant="outline"
            className="w-full text-sm py-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
          >
            View Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;
