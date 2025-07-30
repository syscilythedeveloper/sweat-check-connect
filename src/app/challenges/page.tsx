"use client";
import React, { useState } from "react";

//import { useUser } from "@clerk/nextjs";
import { Trophy, Plus, Search, Play, CheckCircle } from "lucide-react";
import CreateChallengeForm from "@/components/Challenges/CreateChallengeForm";
import ChallengeCard from "@/components/Challenges/ChallengeCard";

const ChallengesPage = () => {
  //const { user } = useUser();
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock challenges data
  const [challenges] = useState([
    {
      id: "1",
      title: "30-Day Running Streak",
      description:
        "Run at least 5K every day for 30 consecutive days. Build consistency and endurance!",
      category: "Cardio",
      duration: 30,
      participants: 1247,
      isJoined: true,
      progress: 67,
      currentDay: 20,
      creator: "RunningClub",
      creatorAvatar: "/images/defaultUser.png",
      rewards: ["Marathon Medal", "Endurance Badge", "500 Points"],
      completionRate: 78,
      tags: ["running", "endurance", "daily"],
      startDate: "2025-01-01",
      endDate: "2025-01-30",
    },
    {
      id: "2",
      title: "Push-Up Power Challenge",
      description:
        "Build up to 100 consecutive push-ups over 6 weeks. Perfect for upper body strength!",
      category: "Strength",

      duration: 42,
      participants: 892,
      isJoined: false,
      progress: 0,
      currentDay: 0,
      creator: "StrengthGuild",
      creatorAvatar: "/images/defaultUser.png",
      rewards: ["Strength Master Badge", "Upper Body Trophy", "1000 Points"],
      completionRate: 65,
      tags: ["pushups", "strength", "bodyweight"],
      startDate: "2025-01-15",
      endDate: "2025-02-26",
    },
    {
      id: "3",
      title: "Daily Steps Goal",
      description:
        "Walk 10,000 steps every day for 3 weeks. Great for building healthy habits!",
      category: "Lifestyle",

      duration: 21,
      participants: 2156,
      isJoined: true,
      progress: 33,
      currentDay: 7,
      creator: "WalkingClub",
      creatorAvatar: "/images/defaultUser.png",
      rewards: ["Walker Badge", "Consistency Medal", "300 Points"],

      completionRate: 89,
      tags: ["walking", "steps", "daily", "habits"],
      startDate: "2025-01-08",
      endDate: "2025-01-28",
    },
    {
      id: "4",
      title: "Yoga & Mindfulness",
      description:
        "Practice yoga and meditation daily for inner peace and flexibility over 4 weeks.",
      category: "Wellness",

      duration: 28,
      participants: 567,
      isJoined: false,
      progress: 0,
      currentDay: 0,
      creator: "ZenFitness",
      creatorAvatar: "/images/defaultUser.png",
      rewards: ["Mindfulness Badge", "Flexibility Trophy", "400 Points"],
      isPopular: false,
      completionRate: 82,
      tags: ["yoga", "meditation", "flexibility", "mindfulness"],
      startDate: "2025-02-01",
      endDate: "2025-02-28",
    },
    {
      id: "5",
      title: "HIIT Warrior Challenge",
      description:
        "Complete intense HIIT workouts 5 times per week for maximum fat burn and conditioning.",
      category: "Cardio",

      duration: 28,
      participants: 734,
      isJoined: true,
      progress: 50,
      currentDay: 14,
      creator: "HIITMasters",
      creatorAvatar: "/images/defaultUser.png",
      rewards: ["HIIT Warrior Badge", "Cardio King Trophy", "800 Points"],
      isPopular: true,
      completionRate: 72,
      tags: ["hiit", "cardio", "intense", "fat-burn"],
      startDate: "2025-01-10",
      endDate: "2025-02-06",
    },
  ]);

  const categories = ["all", "Cardio", "Strength", "Lifestyle", "Wellness"];

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || challenge.category === selectedCategory;

    if (activeTab === "discover") return matchesSearch && matchesCategory;
    if (activeTab === "joined")
      return challenge.isJoined && matchesSearch && matchesCategory;
    if (activeTab === "completed")
      return challenge.progress === 100 && matchesSearch && matchesCategory;

    return matchesSearch && matchesCategory;
  });

  const myJoinedChallenges = challenges.filter((c) => c.isJoined);
  const myCompletedChallenges = challenges.filter((c) => c.progress === 100);

  return (
    <div className="w-full max-w-full mx-auto p-2 sm:p-4 space-y-4 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-purple-glow p-3 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-600" />
              Challenges
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Push your limits and achieve your goals
            </p>
          </div>

          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5 " />
            Create Challenge
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search challenges by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2">
          <TabButton
            label="Discover"
            count={challenges.length}
            isActive={activeTab === "discover"}
            onClick={() => setActiveTab("discover")}
            icon={<Search className="w-4 h-4" />}
          />
          <TabButton
            label="My Challenges"
            count={myJoinedChallenges.length}
            isActive={activeTab === "joined"}
            onClick={() => setActiveTab("joined")}
            icon={<Play className="w-4 h-4" />}
          />
          <TabButton
            label="Completed"
            count={myCompletedChallenges.length}
            isActive={activeTab === "completed"}
            onClick={() => setActiveTab("completed")}
            icon={<CheckCircle className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Create Challenge Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md mx-2 sm:mx-4 rounded-2xl shadow-purple-glow p-3 sm:p-6 ">
            <div className="flex items-center justify-between mb-4 ">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Create Challenge
              </h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <CreateChallengeForm setShowCreateForm={setShowCreateForm} />
          </div>
        </div>
      )}

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            No challenges found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or category filter
          </p>
        </div>
      )}
    </div>
  );
};

// Tab Button Component
const TabButton = ({
  label,
  count,
  isActive,
  onClick,
  icon,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
      isActive
        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
        : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
    }`}
  >
    {icon}
    <span>{label}</span>
    <span
      className={`text-xs px-2 py-1 rounded-full ${
        isActive
          ? "bg-white/20"
          : "bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-400"
      }`}
    >
      {count}
    </span>
  </button>
);

export default ChallengesPage;
