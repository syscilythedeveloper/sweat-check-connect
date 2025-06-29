import React from "react";
import CheckInPost from "@/components/CheckInPost";

const Feed = () => {
  return (
    <div className="flex-1 space-y-3">
      <div>
        <CheckInPost />
      </div>
      <div>
        <CheckInPost />
      </div>
      <div>
        <CheckInPost />
      </div>
    </div>
  );
};

export default Feed;
