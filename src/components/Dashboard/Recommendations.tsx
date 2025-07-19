"use client";
import React, { useEffect } from "react";
import ConnectionCard from "./ConnectionCard";
import { Users } from "lucide-react";

type User = {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
};

const Recommendations = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await fetch("/api/recommendations");
      const users = await response.json();
      console.log("Fetched users:", users);
      setUsers(users);
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="max-w-sm mx-auto p-4 space-y-4">
      {" "}
      <div className="bg-gray-200 dark:bg-slate-900 rounded-2xl shadow-[0_0_20px_8px_rgba(63,23,154,0.3)]  p-4 space-y-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4 ">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 ">
              <Users className="w-6 h-6 text-purple-600" />
              Connect with Others
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Discover fitness enthusiasts in your area
          </p>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <ConnectionCard
                user={user}
                type="recommendation"
              />
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all w-full">
            View All Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
