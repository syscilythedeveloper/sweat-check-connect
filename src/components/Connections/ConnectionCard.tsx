import { ConnectionCardProps, connectionType } from "@/types/connections";
import { UserRoundX } from "lucide-react";
import Image from "next/image";
import { isFollowedBy } from "@/utils/connectionFunctions";
import { Button } from "../ui/button";

const ConnectionCard = ({
  connection,
  connectionStatus,
}: {
  connection: ConnectionCardProps;
  connectionStatus: connectionType;
  mutualConnection?: boolean;
}) => (
  <div className="flex flex-col h-full bg-accent-foreground rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] shadow-blue-glow">
    <div className="flex-1 p-6 pb-4 flex flex-col items-center text-center">
      <div className="relative mb-4">
        <Image
          width={80}
          height={80}
          src={connection.avatar}
          alt={connection.username}
          className="w-20 h-20 rounded-full object-cover  shadow-lg border-2 border-white dark:border-slate-800"
        />
      </div>
      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
        @{connection.username}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-200 mb-4 line-clamp-2 italic">
        &quot;{connection.bio}&quot;
      </p>
    </div>
    {connectionStatus === connectionType.following && (
      <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-600">
        <Button
          variant="destructive"
          className="w-full"
        >
          <UserRoundX className="w-4 h-4" />
          Unfollow
        </Button>
      </div>
    )}
    {connectionStatus === connectionType.followed_by && (
      <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-600">
        <div className="flex flex-col gap-3">
          {isFollowedBy("someUserId", connection.id) ? (
            <Button
              variant="secondary"
              className="w-full"
            >
              <UserRoundX className="w-4 h-4" />
              Follow Back
            </Button>
          ) : null}
          <Button
            variant="destructive"
            className="w-full"
          >
            <UserRoundX className="w-4 h-4" />
            Remove Follower
          </Button>
        </div>
      </div>
    )}
    {connectionStatus === connectionType.not_connected && (
      <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-600">
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            className="w-full"
          >
            <UserRoundX className="w-4 h-4" />
            Follow User
          </Button>
        </div>
      </div>
    )}
  </div>
);

export default ConnectionCard;
