import React from "react";

import Feed from "@/components/Feed";
import Recommendations from "@/components/Recommendations";

const page = () => {
  return (
    <div className="flex h-screen">
      <Feed />
      <Recommendations />
    </div>
  );
};

export default page;
