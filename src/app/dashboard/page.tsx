import React from "react";

import Feed from "@/components/Dashboard/Feed";
import Recommendations from "@/components/Dashboard/Recommendations";

const page = () => {
  return (
    <div className="flex h-screen">
      <Feed />
      <div className="hidden lg:block">
        <Recommendations />
      </div>
    </div>
  );
};

export default page;
