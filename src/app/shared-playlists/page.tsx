/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
//import { useUser } from "@clerk/nextjs";
import {
  Music,
  Play,
  Pause,
  Heart,
  Share,
  Download,
  Clock,
  Users,
  Plus,
  Search,
  Volume2,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";

const SharedPlaylists = () => {
  //const { user } = useUser();
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  // Mock playlists data
  const [playlists] = useState([
    {
      id: "1",
      title: "HIIT Pump Up",
      description:
        "High-energy tracks perfect for intense HIIT workouts. Get your heart pumping!",
      creator: {
        name: "GymBuddy",
        username: "gymbud23",
        avatar: "/images/placeholder-avatar-1.png",
      },
      genre: "Electronic",
      duration: "45 min",
      trackCount: 18,
      likes: 324,
      downloads: 156,
      isLiked: true,
      isFollowing: true,
      coverImage: "/images/playlist-hiit.jpg",
      tags: ["HIIT", "Cardio", "High Energy"],
      createdDate: "2 days ago",
      workoutType: "HIIT",
      bpm: "140-160",
      popularTracks: [
        "Titanium - David Guetta",
        "Stronger - Kanye West",
        "Can't Hold Us - Macklemore",
      ],
    },
    {
      id: "2",
      title: "Strength & Power",
      description:
        "Heavy beats for heavy lifting. Perfect for your strength training sessions.",
      creator: {
        name: "IronMan",
        username: "iron_mike",
        avatar: "/images/placeholder-avatar-3.png",
      },
      genre: "Rock",
      duration: "62 min",
      trackCount: 24,
      likes: 189,
      downloads: 89,
      isLiked: false,
      isFollowing: false,
      coverImage: "/image/music-icon.png",
      tags: ["Strength", "Rock", "Motivation"],
      createdDate: "5 days ago",
      workoutType: "Strength",
      bpm: "120-140",
      popularTracks: [
        "Thunder - Imagine Dragons",
        "Eye of the Tiger - Survivor",
        "We Will Rock You - Queen",
      ],
    },
    {
      id: "3",
      title: "Yoga Flow Vibes",
      description:
        "Peaceful and flowing music for your yoga and stretching sessions.",
      creator: {
        name: "HealthyHabits",
        username: "healthy_life",
        avatar: "/images/placeholder-avatar-4.png",
      },
      genre: "Ambient",
      duration: "38 min",
      trackCount: 12,
      likes: 267,
      downloads: 203,
      isLiked: true,
      isFollowing: true,
      coverImage: "/images/playlist-yoga.jpg",
      tags: ["Yoga", "Relaxation", "Mindfulness"],
      createdDate: "1 week ago",
      workoutType: "Yoga",
      bpm: "60-80",
      popularTracks: [
        "Weightless - Marconi Union",
        "River - Eminem ft. Ed Sheeran",
        "Breathe Me - Sia",
      ],
    },
    {
      id: "4",
      title: "Running Motivation",
      description:
        "Steady beats to keep your pace during long runs and cardio sessions.",
      creator: {
        name: "CardioQueen",
        username: "cardio_queen",
        avatar: "/images/placeholder-avatar-2.png",
      },
      genre: "Pop",
      duration: "52 min",
      trackCount: 20,
      likes: 445,
      downloads: 298,
      isLiked: false,
      isFollowing: true,
      coverImage: "/images/playlist-running.jpg",
      tags: ["Running", "Cardio", "Motivation"],
      createdDate: "3 days ago",
      workoutType: "Cardio",
      bpm: "120-140",
      popularTracks: [
        "Uptown Funk - Bruno Mars",
        "Don't Stop Me Now - Queen",
        "Good as Hell - Lizzo",
      ],
    },
    {
      id: "5",
      title: "Late Night Gym",
      description: "Dark, intense vibes for those late-night workout sessions.",
      creator: {
        name: "NightOwl",
        username: "midnight_lifter",
        avatar: "/images/placeholder-avatar-5.png",
      },
      genre: "Hip Hop",
      duration: "41 min",
      trackCount: 16,
      likes: 178,
      downloads: 92,
      isLiked: true,
      isFollowing: false,
      coverImage: "/images/playlist-night.jpg",
      tags: ["Hip Hop", "Dark", "Intense"],
      createdDate: "6 days ago",
      workoutType: "Mixed",
      bpm: "100-130",
      popularTracks: [
        "HUMBLE. - Kendrick Lamar",
        "Sicko Mode - Travis Scott",
        "God's Plan - Drake",
      ],
    },
  ]);

  const genres = ["all", "Electronic", "Rock", "Pop", "Hip Hop", "Ambient"];

  const filteredPlaylists = playlists.filter((playlist) => {
    const matchesSearch =
      playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesGenre =
      selectedGenre === "all" || playlist.genre === selectedGenre;

    if (activeTab === "discover") return matchesSearch && matchesGenre;
    if (activeTab === "liked")
      return playlist.isLiked && matchesSearch && matchesGenre;
    if (activeTab === "following")
      return playlist.isFollowing && matchesSearch && matchesGenre;

    return matchesSearch && matchesGenre;
  });

  const likedPlaylists = playlists.filter((p) => p.isLiked);
  const followingPlaylists = playlists.filter((p) => p.isFollowing);

  const handlePlayPause = (playlistId: string) => {
    setCurrentlyPlaying(currentlyPlaying === playlistId ? null : playlistId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Music className="w-8 h-8 text-purple-600" />
              Workout Playlists
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Discover and share the perfect soundtracks for your workouts
            </p>
          </div>

          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Playlist
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search playlists by name, creator, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Genre Filter */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {genres.map((genre) => (
              <option
                key={genre}
                value={genre}
              >
                {genre === "all" ? "All Genres" : genre}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2">
          <TabButton
            label="Discover"
            count={playlists.length}
            isActive={activeTab === "discover"}
            onClick={() => setActiveTab("discover")}
            icon={<Search className="w-4 h-4" />}
          />
          <TabButton
            label="Liked"
            count={likedPlaylists.length}
            isActive={activeTab === "liked"}
            onClick={() => setActiveTab("liked")}
            icon={<Heart className="w-4 h-4" />}
          />
          <TabButton
            label="Following"
            count={followingPlaylists.length}
            isActive={activeTab === "following"}
            onClick={() => setActiveTab("following")}
            icon={<Users className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            isPlaying={currentlyPlaying === playlist.id}
            onPlayPause={() => handlePlayPause(playlist.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPlaylists.length === 0 && (
        <div className="text-center py-12">
          <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            No playlists found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or genre filter
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
        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
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

// Playlist Card Component
const PlaylistCard = ({
  playlist,
  isPlaying,
  onPlayPause,
}: {
  playlist: any;
  isPlaying: boolean;
  onPlayPause: () => void;
}) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
    {/* Cover Image */}
    <div className="relative">
      <Image
        src="/images/music-icon.png"
        alt={playlist.title}
        width={400}
        height={200}
      />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <button
          onClick={onPlayPause}
          className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all transform hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-gray-800" />
          ) : (
            <Play className="w-8 h-8 text-gray-800 ml-1" />
          )}
        </button>
      </div>

      {/* Genre Badge */}
      <div className="absolute top-3 left-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
            playlist.genre === "Electronic"
              ? "bg-blue-500/80 text-white"
              : playlist.genre === "Rock"
              ? "bg-red-500/80 text-white"
              : playlist.genre === "Pop"
              ? "bg-pink-500/80 text-white"
              : playlist.genre === "Hip Hop"
              ? "bg-gray-800/80 text-white"
              : "bg-purple-500/80 text-white"
          }`}
        >
          {playlist.genre}
        </span>
      </div>
    </div>

    {/* Card Content */}
    <div className="p-6">
      {/* Title and Creator */}
      <div className="mb-3">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
          {playlist.title}
        </h3>
        <div className="flex items-center gap-2">
          <Image
            src={playlist.creator.avatar}
            alt={playlist.creator.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            by {playlist.creator.name}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {playlist.description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{playlist.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Music className="w-4 h-4" />
          <span>{playlist.trackCount} tracks</span>
        </div>
        <div className="flex items-center gap-1">
          <Volume2 className="w-4 h-4" />
          <span>{playlist.bpm} BPM</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {playlist.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Popular Tracks Preview */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-800 dark:text-white mb-2">
          Popular tracks:
        </p>
        <div className="space-y-1">
          {playlist.popularTracks
            .slice(0, 2)
            .map((track: string, index: number) => (
              <p
                key={index}
                className="text-xs text-gray-600 dark:text-gray-400 truncate"
              >
                • {track}
              </p>
            ))}
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-red-500">
            <Heart className="w-4 h-4" />
            {playlist.likes}
          </span>
          <span className="flex items-center gap-1 text-blue-500">
            <Download className="w-4 h-4" />
            {playlist.downloads}
          </span>
        </div>
        <span className="text-gray-500 dark:text-gray-400">
          {playlist.createdDate}
        </span>
      </div>
    </div>

    {/* Card Footer */}
    <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-600">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className={`p-2 rounded-lg transition-colors ${
              playlist.isLiked
                ? "text-red-500"
                : "text-gray-500 dark:text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${playlist.isLiked ? "fill-current" : ""}`}
            />
          </button>
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 rounded-lg transition-colors">
            <Share className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-green-500 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {playlist.isFollowing && (
            <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
              Following
            </span>
          )}
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SharedPlaylists;
